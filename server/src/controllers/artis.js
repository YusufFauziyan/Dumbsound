// import models
const { 
    artis,
    music
} = require('../../models')

// add artis
exports.addArtis = async (req, res) => {
    try {
        // Create data artis
        const data = await artis.create(req.body)

        res.status(200).send({
            status: "success",
            message: 'Success add Artis',
            data: data
        })
    } catch (error) {
        console.log(error);
        res.status(500).send ({
            status: 'failed',
            message: 'server error',
        })
    }
}

exports.getArtiss = async (req, res) => {
    try {
        // get all data artis
        const datas = await artis.findAll({
            include: {
                model: music,
                as: 'music',
                attributes: {
                    exclude: ["updatedAt", "createdAt", "idArtis"]
                }
            },
            attributes: {
                exclude: ["updatedAt", "createdAt"]
            }
        })

        res.status(200).send({
            status: "success",
            message: 'Success add Artis',
            data: datas
        })
    } catch (error) {
        console.log(error);
        res.status(500).send ({
            status: 'failed',
            message: 'server error',
        })
    }
}

exports.getArtis = async (req, res) => {
    try {
        // get id
        const { id } = req.params
        // get artis by id
        const data = await artis.findOne({
            where: {
                id
            },
            include: {
                model: music,
                as: 'music',
                attributes: {
                    exclude: ["updatedAt", "createdAt", "idArtis"]
                }
            },
            attributes: {
                exclude: ["updatedAt", "createdAt"]
            }
        })

        res.status(200).send({
            status: "success",
            message: 'Success add Artis',
            data: data
        })
    } catch (error) {
        console.log(error);
        res.status(500).send ({
            status: 'failed',
            message: 'server error',
        })
    }
}