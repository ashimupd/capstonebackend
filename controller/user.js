const user = require('../models').User;

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
            res.send(e)
        }
    },

    async addUser(req, res) {
        try {
            let userExist = await user.findOne({ where: { email: req.body.email } });
            if (userExist) {
                res.status(200).json({
                    success: false,
                    message: 'User exist'
                })
            }

            else {
                await user.create(req.body).then(user => {
                    res.status(200).json({
                        success: false,
                        message: 'Account created successfully'
                    })
                });
            }

        }
        catch (e) {
            res.send(e)
        }
    }
}