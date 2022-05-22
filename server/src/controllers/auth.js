//import models
const {user} = require('../../models')

// import package
const joi = require('joi') //validator for regist/login
const bcrypt = require('bcrypt') //make hased password
const jwt = require('jsonwebtoken')//get token

// funciton
exports.register = async (req, res) => {
    try {
        const data = req.body
        const { email, password } = data

        // validation
        const schema = joi.object({
            email: joi.string().email().min(5).required(),
            password: joi.string().min(6).required(),
            fullName: joi.string().min(3),
            phone: joi.number().min(11),
            address: joi.string().min(10),
        })

        // get error validation
        const { error } = schema.validate(data)

        // if error exist send validation err message
        if (error) {
            return res.send ({
                message: error.details[0].message,
            })
        }

        // Check Email validation
        const emailCheck = await user.findOne({
            where: {
                email
            }
        })
        //validation
        if (emailCheck) {
            return res.send ({
                status: "failed",
                message: "Email already use, please use another email"
            })
        }

        // generate salt get random value with 10 rounds
        const hashStrenght = 10
        // has password from req with salt
        const hashedPassword = await bcrypt.hash(password, hashStrenght)

        // input data to database
        const newUser = await user.create({
            ...data,
            password: hashedPassword,
            status: "user"
        })

        // generate tokenKey
        const token = jwt.sign({ id: newUser.id }, process.env.TOKEN_KEY)

        res.status(200).send ({
            status: "success",
            data: {
                id: newUser.id,
                name: newUser.fullName,
                email: newUser.email,
                token,
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "server error"
        })
    }
}


exports.login = async (req, res) => {
    try {
        const data = req.body
        const { email, password } = data

        //validation login
        const schema = joi.object({
            email: joi.string().email().min(5).required(),
            password: joi.string().min(6).required(),
        });

        // get error validation
        const { error } = schema.validate(data)

        // if error exist send validation err message
        if (error) {
            return res.send ({
                message: error.details[0].message,
            })
        }

        // Check Email validation
        const userExist = await user.findOne({
            where: {
                email
            },
        })
        //validation
        if (!userExist) {
            return res.status(400).send ({
                status: "failed",
                message: "Email not found, plesae regist first!"
            })
        }

        // Check Password validation
        const isValid = await bcrypt.compare(password, userExist.password);
        // if unvalid
        if (!isValid) {
            return res.status(400).send({
                status: "failed",
                message: "Email or Password incorrect",
            });
        }
        
        // generate tokenKey
        const token = jwt.sign({ id: userExist.id }, process.env.TOKEN_KEY)

        res.status(200).send({
            status: "success",
            data: {
                user: {
                    id: userExist.id,
                    email: userExist.email,
                    status: userExist.status,
                    token,
                }
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "Server Error",
        });
    }
}


exports.checkAuth = async (req, res) => {
    try {
        const id = req.user.id;
        
        // Check user
        const dataUser = await user.findOne({
            where: {
                id,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "password"],
            },
        });
        
        // if not user
        if (!dataUser) {
            return res.status(404).send({
                status: "failed",
            });
        }
  
        res.send({
            status: "success",
            data: {
                user: {
                    id: dataUser.id,
                    fullName: dataUser.fullName,
                    email: dataUser.email,
                    status: dataUser.status,
                    transaction: dataUser.transaction,
                },
            },
        });
    } catch (error) {
        console.log(error);
        res.status({
            status: "failed",
            message: "Server Error",
        });
    }
};
