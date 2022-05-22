// import models
const {
    music,
    artis
} = require ('../../models')

// add music
exports.addMusic = async (req, res) => {
    try {
        const data = req.body;
        const thumbnail = req.files.imageSong[0].filename
        const attache = req.files.fileSong[0].filename

        const dataUpload = {
            ...data,
            thumbnail,
            attache
        }

        //create data
        await music.create(dataUpload)

        res.status(200).send({
            status: "success",
            message: "Success upload music"
        })
    } catch (error) {
        console.log(error);
        res.status(200).send({
            status: "failed",
            message: "Server error"
        })
    }
}

// get all music data
exports.getMusics = async (req, res) => {
    try {
        const musics = await music.findAll({
            include: {
                model: artis,
                as: 'artis',
                attributes: {
                    exclude: ["updatedAt", "createdAt"]
                }
            },
            attributes: {
                exclude: ["updatedAt", "createdAt", "idArtis"]
            }
        })

        res.status(200).send({
            status: "success",
            message: "Success get all musics",
            data: {
                musics,
            }
        })
    } catch (error) {
        console.log(error);
        res.status(200).send({
            status: "failed",
            message: "Server error"
        })
    }
}

//get music by id
exports.getMusic = async (req, res) => {
    try {
        //get id
        const { id } = req.params

        const song = await music.findOne({
            where: {
                id
            },
            include: {
                model: artis,
                as: 'artis',
                attributes: {
                    exclude: ["updatedAt", "createdAt"]
                }
            },
            attributes: {
                exclude: ["updatedAt", "createdAt", "idArtis"]
            }
        })

        res.status(200).send({
            status: "success",
            message: 'Success get music',
            data: song
        })
    } catch (error) {
        console.log(error);
        res.status(200).send({
            status: "failed",
            message: "Server error"
        })
    }
}