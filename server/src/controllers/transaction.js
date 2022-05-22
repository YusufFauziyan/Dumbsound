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

        data = {
            id: parseInt(data.transaction + Math.random().toString().slice(3, 8)),
            ...data,
            userId: req.user.id,
            status: "pending",
        };

          // Insert data to transaction table
        const newData = await transaction.create(data);

        const userData = await user.findOne({
            where: {
              id: newData.userId,
            },
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"],
            },
        });

         // Create Snap API instance
        let snap = new midtransClient.Snap({
            // Set to true for  Production Environment (accept real transaction).
            isProduction: false,
            serverKey: process.env.MIDTRANS_SERVER_KEY,
        });

        // const userTx = await transaction.create({
        //     ...data,
        //     userId: req.user.id,
        //     status: "pending"
        // })

        res.status(200).send({
            status: "success",
            message: "add transaction successfully",
            userTx
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "server error"
        })
    }
}

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

