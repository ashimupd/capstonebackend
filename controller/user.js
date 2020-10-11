const user = require('../models').User;
const bcrypt = require('bcrypt');
const config = require('../config')
const jwt = require('jsonwebtoken')
module.exports = {
    async getUsers(req, res) {
        try {
            let userCollection = await user.findAll();
            if (userCollection && userCollection.length > 0) {
                res.status(200).json({
                    success: true,
                    message: 'User List',
                    data: userCollection
                })
            }

            else {
                res.status(200).json({
                    success: false,
                    message: 'No users in the list',
                })
            }
        }
        catch (e) {
            res.status(500).send(e)
        }
    },

    async signup(req, res) {
        try {
            let userExist = await user.findOne({ where: { email: req.body.email } });
            if (userExist) {
                res.status(200).json({
                    success: false,
                    message: 'User with same email already exist. Please choose a different one'
                })
            }

            else {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                await user.create({
                    "fname": req.body.fname,
                    "lname": req.body.lname,
                    "phone": req.body.phone,
                    "email": req.body.email,
                    "district": req.body.district,
                    "postalcode": req.body.postalcode,
                    "password": hashedPassword
                }).then(user => {
                    res.status(200).json({
                        success: true,
                        message: 'New account created successfully'
                    })
                });
            }

        }
        catch (e) {
            res.status(500).send(e)
        }
    },

    async login(req, res) {
        try {
            let userData = await user.findOne({ where: { email: req.body.email } });
            if (userData) {
                if (await bcrypt.compare(req.body.password, userData.password)) {
                    const token = jwt.sign({ email: userData.email, id: userData.id }, config.secret, { expiresIn: "7d" })
                    res.status(200).json({
                        success: true,
                        message: 'Login successfull',
                        token: token,
                        data: userData
                    })
                }
                else {
                    res.status(200).json({
                        success: false,
                        message: 'Invalid creditianls',
                    })
                }
            }
            else {
                res.status(200).json({
                    success: false,
                    message: 'User doesnot exist',
                })
            }

        }
        catch (e) {
            res.status(500).send(e)
        }
    },

    async logout(req, res) {
        const token = req.headers.authorization.split(" ")[1];

        try {
            res.send(jwt.destroy(token))
        }
        catch (e) {
            res.status(500).send(e)
        }
    }
}