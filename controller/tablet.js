const Tablet = require('../models').Tablet;
const user = require('../models').User;
const fs = require('fs');

module.exports = {

    async addTablet(req, res) {
        try {
            await Tablet.create(req.body).then(Tablet => {
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

    async getTabletData(req, res) {
        try {
            let TabletCollection = await Tablet.findAll();
            if (TabletCollection && TabletCollection.length > 0) {
                res.status(200).json({
                    success: true,
                    message: 'Tablet List',
                    data: TabletCollection
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

    async getTabletDatabyId(req, res) {
        try {
            let TabletCollection = await Tablet.findOne({ where: { id: req.params.id } });
            if (TabletCollection) {
                res.status(200).json({
                    success: true,
                    message: 'Tablet List',
                    data: TabletCollection
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


    async updateTabletData(req, res) {

        try {
            let TabletCollection = await Tablet.findOne({ where: { id: req.body.id } });
            if (TabletCollection) {

                if (TabletCollection.image === req.body.image) {
                    // do nothing
                }
                else {
                    fs.unlink('./upload/images/' + TabletCollection.image, (err) => {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            console.log('Image ' + TabletCollection.image + 'deleted')
                        }
                    })
                }



                Tablet.update(req.body, { where: { id: req.body.id } }).then(Tablet => {
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

    async deleteTabletData(req, res) {

        try {
            let TabletCollection = await Tablet.findOne({ where: { id: req.params.id } });
            if (TabletCollection) {

                fs.unlink('./upload/images/' + TabletCollection.image, (err) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log('Image ' + TabletCollection.image + 'deleted')
                    }
                })

                Tablet.destroy({ where: { id: req.params.id } }).then(Tablet => {
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