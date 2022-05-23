// midtransClient
const midtransClient = require("midtrans-client");

// import models
const {
    transaction,
    user
} = require ('../../models')

//add transaction
exports.addTransaction = async (req, res) => {
    try {
        const data = req.body


        const newData = await transaction.create({
            ...data,
            status: "pending",
            price: "30000",
            userId: req.user.id,
        });

        // user
        const userData = await user.findOne({
            where:{
                id: newData.userId
            }
        })

         // Create Snap API instance
        let snap = new midtransClient.Snap({
            // Set to true if you want Production Environment (accept real transaction).
            isProduction: false,
            serverKey: process.env.MIDTRANS_SERVER_KEY,
        });
    
        let parameter = {
            transaction_details: {
                order_id: parseInt(newData.id + Math.random().toString().slice(3, 8)),
                gross_amount: newData.price,
            },
            credit_card: {
                secure: true,
            },
            customer_details: {
                full_name: userData?.fullName,
                email: userData?.email,
                phone: userData?.phone,
            },
        };

        const payment = await snap.createTransaction(parameter);
        console.log(payment);

        res.status(200).send({
            status: "pending",
            message: "Pending transaction payment gateway",
            payment,
            newData
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "server error"
        })
    }
}

const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY;
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;

const core = new midtransClient.CoreApi();

core.apiConfig.set({
  isProduction: false,
  serverKey: MIDTRANS_SERVER_KEY,
  clientKey: MIDTRANS_CLIENT_KEY,
});

/**
 *  Handle update transaction status after notification
 * from midtrans webhook
 * @param {string} status
 * @param {transactionId} transactionId
 */

// notification
exports.notification = async (req, res) => {
    try {
      const statusResponse = await core.transaction.notification(req.body);
      const orderId = statusResponse.order_id; // id transaksi
      const transactionStatus = statusResponse.transaction_status; //status transaski database
      const fraudStatus = statusResponse.fraud_status;//status transaksi miidtrans
  
      if (transactionStatus == "capture") {
        if (fraudStatus == "challenge") {
          // TODO set transaction status on your database to 'challenge'
          // and response with 200 OK
          // Init sendEmail function with status "pending" and order id here ...
        //   sendEmail("pending", orderId);
          handleTransaction("pending", orderId);
          res.status(200);
        } else if (fraudStatus == "accept") {
          // TODO set transaction status on your database to 'success'
          // and response with 200 OK
          // Init sendEmail function with status "success" and order id here ...
        //   sendEmail("success", orderId);
          updateProduct(orderId);
          handleTransaction("success", orderId);
          res.status(200);
        }
      } else if (transactionStatus == "settlement") {
        // TODO set transaction status on your database to 'success'
        // and response with 200 OK
        // Init sendEmail function with status "success" and order id here ...
        // sendEmail("success", orderId);
        updateProduct(orderId);
        handleTransaction("success", orderId);
        res.status(200);
      } else if (
        transactionStatus == "cancel" ||
        transactionStatus == "deny" ||
        transactionStatus == "expire"
      ) {
        // TODO set transaction status on your database to 'failure'
        // and response with 200 OK
        // Init sendEmail function with status "failed" and order id here ...
        // sendEmail("failed", orderId);
        handleTransaction("failed", orderId);
        res.status(200);
      } else if (transactionStatus == "pending") {
        // TODO set transaction status on your database to 'pending' / waiting payment
        // and response with 200 OK
        // Init sendEmail function with status "pending" and order id here ...
        sendEmail("pending", orderId);
        handleTransaction("pending", orderId);
        res.status(200);
      }
    } catch (error) {
      console.log(error);
      res.status(500);
    }
};

const handleTransaction = async (status, transactionId) => {
    await transaction.update(
        {
            status,
        },
        {
            where: {
                id: transactionId,
            },
        }
    );
};
  

  



exports.getTransactions = async (req, res) => {
    try {
        const transactions = await transaction.findAll({
            include: {
                model: user,
                as: "user",
                attributes: {
                    exclude: ["updatedAt", "createdAt", "password"]
                }
            },
            attributes: {
                exclude: ["updatedAt", "createdAt", "userId"]
            }
        })
        res.status(200).send({
            status: "success",
            message: "Success get all transaction",
            transactions
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "server error"
        })
    }
}

exports.getTransaction = async (req, res) => {{
    try {
        const {id} = req.params

        const userTransaction =  await transaction.findOne({
            include: {
                model: user,
                as: "user",
                attributes: {
                    exclude: ["updatedAt", "createdAt", "password"]
                }
            },
            where: {
                id
            },
            attributes: {
                exclude: ["updatedAt", "createdAt", "userId"]
            },
        })
        res.status(200).send({
            status: "success",
            message: "Success get transaction",
            data: {
                user: userTransaction
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "server error"
        })
    }
}}

