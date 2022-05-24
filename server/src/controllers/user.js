const {
    user,
    transaction
} = require ('../../models')

exports.getUsers = async (req, res) => {
    try {
        // get all user data
        const getData = await user.findAll({
            include: {
                model: transaction,
                as: 'transaction',
                attributes: {
                    exclude: ["updatedAt", "createdAt", "userId"]
                }
            },
            attributes: {
                exclude: ["updatedAt", "createdAt", "password"]
            }
        })

        res.status(200).send({
            status: "success",
            message: "success get all Users",
            getData
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'failed',
            message: 'server error'
        })
    }
}

exports.getUser = async (req, res) => {
    try {
        // get id user
        const { id } = req.params

        // get user
        const dataUser = await user.findOne({
            include: {
                model: transaction,
                as: 'transaction',
                attributes: {
                    exclude: ["updatedAt", "createdAt", "userId"]
                }
            },
            where: {
                id
            },
            attributes: {
                exclude: ["updatedAt", "createdAt", "password"]
            }
        })

        res.status(200).send({
            status: "success",
            message: 'get user success',
            dataUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'failed',
            message: 'server error'
        })
    }
}