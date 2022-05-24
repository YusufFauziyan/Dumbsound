const { user, chat } = require ('../../models')

const {Op} = require ('sequelize')
const jwt = require("jsonwebtoken");

const connectedUser = {}

const socketIo = (io) => {

  // autorize token
  io.use((socket, next) => {
    if (socket.handshake.auth && socket.handshake.auth.token ) {
      next();
    } else {
      next(new Error("Not Authorized"));
    }
  });

  io.on('connection', (socket) => {
    console.log('client connect:', socket.id);

   const userId = socket.handshake.query.id
   connectedUser[userId] = socket.id

    socket.on("load admin contact", async () => {
      try {
        const adminContact = await user.findOne({
          where: {
            status: "admin"
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
      });
    
      // emit event to send admin data on event “admin contact”
      socket.emit("admin contact", adminContact)
      } catch (err) {
        console.log(err)
      }
    })

    socket.on("load user contacts", async () => {
      try {
        let userContacts = await user.findAll({
          include: [
            {
              model: chat,
              as: "recipientMessage",
              attributes: {
                exclude: ["createdAt", "updatedAt"]
              },
            },
            {
              model: chat,
              as: "senderMessage",
              attributes: {
                exclude: ["createdAt", "updatedAt"]
              },
            },
          ],
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"]
          },
      });

      userContacts = JSON.parse(JSON.stringify(userContacts))
      userContacts = userContacts.map((item) => ({
        ...item,
      }))


      // emit event to send admin data on event “admin contact”
      socket.emit("user contacts", userContacts)
      } catch (err) {
        console.log(err)
      }
    })

    socket.on("load messages", async (payload) => {
      try {
        const token = socket.handshake.auth.token

        const tokenKey = process.env.TOKEN_KEY
        const verified = jwt.verify(token, tokenKey)

        const idRecipient = payload // catch recipient id sent from client
        const idSender = verified.id //id user

        const data = await chat.findAll({
          where: {
            idSender: {
              [Op.or]: [idRecipient, idSender]
            },
            idRecipient: {
              [Op.or]: [idRecipient, idSender]
            }
          },
          include: [
            {
              model: user,
              as: "recipient",
              attributes: {
                exclude: ["createdAt", "updatedAt", "password"],
              },
            },
            {
              model: user,
              as: "sender",
              attributes: {
                exclude: ["createdAt", "updatedAt", "password"],
              },
            },
          ],
          order: [['createdAt', 'ASC']],
          attributes: {
            exclude: ["createdAt", "updatedAt", "idRecipient", "idSender"],
          }
        })

        socket.emit("messages", data)
      } catch (error) {
        console.log(error)
      }
    })

    // define listener on event send message
    socket.on("send message", async (payload) => {
      try {
        const token = socket.handshake.auth.token
        
        const tokenKey = process.env.TOKEN_KEY
        const verified = jwt.verify(token, tokenKey)
        
        const idSender = verified.id //id user
        const {
          message,
          idRecipient
        } = payload // catch recipient id and message sent from client

        await chat.create({
          message,
          idRecipient,
          idSender
        })

        // emit to just sender and recipient default rooms by their socket id
        io.to(socket.id).to(connectedUser[idRecipient]).emit("new message", idRecipient)
      } catch (error) {
        console.log(error)
      }
    })

    // when user disconnect
    socket.on("disconnect", () => {
      console.log("client disconnected", socket.id)
      delete connectedUser[userId]
    })
  })
}
 
module.exports = socketIo