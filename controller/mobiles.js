const Mobiles = require('../models').Mobiles;
const user = require('../models').User;
const fs = require('fs');

module.exports = {

    async addMobiles(req, res) {
        try {
            await Mobiles.create(req.body).then(Mobiles => {
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

    async getMobilesData(req, res) {
        try {
            let MobilesCollection = await Mobiles.findAll();
            if (MobilesCollection && MobilesCollection.length > 0) {
                res.status(200).json({
                    success: true,
                    message: 'Mobiles List',
                    data: MobilesCollection
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

    async getMobilesDatabyId(req, res) {
        try {
            let MobilesCollection = await Mobiles.findOne({ where: { id: req.params.id } });
            if (MobilesCollection) {
                res.status(200).json({
                    success: true,
                    message: 'Mobiles List',
                    data: MobilesCollection
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

    async updateMobilesData(req, res) {



        try {
            let MobilesCollection = await Mobiles.findOne({ where: { id: req.body.id } });
            if (MobilesCollection) {

                if (MobilesCollection.image === req.body.image) {
                    // do nothing
                }
                else {
                    fs.unlink('./upload/images/' + MobilesCollection.image, (err) => {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            console.log('Image ' + MobilesCollection.image + 'deleted')
                        }
                    })
                }



                Mobiles.update(req.body, { where: { id: req.body.id } }).then(Mobiles => {
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

    async deleteMobilesData(req, res) {

        try {
            let MobilesCollection = await Mobiles.findOne({ where: { id: req.params.id } });
            if (MobilesCollection) {

                fs.unlink('./upload/images/' + MobilesCollection.image, (err) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log('Image ' + MobilesCollection.image + 'deleted')
                    }
                })

                Mobiles.destroy({ where: { id: req.params.id } }).then(Mobiles => {
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