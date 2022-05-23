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
            userId: req.user.id
        });
        
        res.status(200).send({
            status: "pending",
            message: "Pending transaction payment gateway",
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

