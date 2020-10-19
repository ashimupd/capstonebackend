const Userindexpage = require('../models').Userindexpage;
const user = require('../models').User;
const fs = require('fs');

module.exports = {

    async addUserindexpage(req, res) {
        try {
            await Userindexpage.create(req.body).then(Userindexpage => {
                res.status(200).json({
                    success: true,
                    message: 'New item added successfully'
                })
            });


        }
        catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    },

    async getUserindexpageData(req, res) {
        try {
            let UserindexpageCollection = await Userindexpage.findAll();
            if (UserindexpageCollection && UserindexpageCollection.length > 0) {
                res.status(200).json({
                    success: true,
                    message: 'Userindexpage List',
                    data: UserindexpageCollection
                })
            }

            else {
                res.status(200).json({
                    success: false,
                    message: 'No items in the list',
                })
            }
        }
        catch (e) {
            res.status(500).send(e)
        }
    },

    async getUserIndexDatabyType(req, res) {
        try {
            let UserindexpageCollection = await Userindexpage.findAll({ where: { type: req.params.type } });
            if (UserindexpageCollection) {
                res.status(200).json({
                    success: true,
                    message: 'User index ' + req.params.type + 'data List',
                    data: UserindexpageCollection
                })
            }

            else {
                res.status(200).json({
                    success: false,
                    message: 'No items in the list',
                })
            }
        }
        catch (e) {
            console.log({ e })
            res.status(500).send(e)
        }
    },

    async updateUserindexpageData(req, res) {


        try {
            let UserindexpageCollection = await Userindexpage.findOne({ where: { id: req.body.id } });
            if (UserindexpageCollection) {

                if (UserindexpageCollection.image === req.body.image) {
                    // Do nothing
                }

                else {
                    fs.unlink('./upload/images/' + UserindexpageCollection.image, (err) => {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            console.log('Image ' + UserindexpageCollection.image + 'deleted')
                        }
                    })
                }


                Userindexpage.update(req.body, { where: { id: req.body.id } }).then(Userindexpage => {
                    res.status(200).json({
                        success: true,
                        message: req.body.name + ' updated successfully',
                    })
                })
            }
            else {
                res.status(200).json({
                    success: false,
                    message: req.body.name + 'Not found',
                })
            }
        }
        catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    },

    async deleteUserindexpageData(req, res) {

        try {
            let UserindexpageCollection = await Userindexpage.findOne({ where: { id: req.params.id } });
            if (UserindexpageCollection) {

                fs.unlink('./upload/images/' + UserindexpageCollection.image, (err) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log('Image ' + UserindexpageCollection.image + 'deleted')
                    }
                })

                Userindexpage.destroy({ where: { id: req.params.id } }).then(Userindexpage => {
                    res.status(200).json({
                        success: true,
                        message: 'Deleted successfully',
                    })
                })
            }
            else {
                res.status(200).json({
                    success: false,
                    message: 'Item Not found',
                })
            }
        }
        catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    },
}