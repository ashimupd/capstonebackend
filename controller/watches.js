const Watches = require('../models').Watches;
const user = require('../models').User;
const fs = require('fs');

module.exports = {

    async addWatches(req, res) {
        try {
            await Watches.create(req.body).then(Watches => {
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

    async getWatchesData(req, res) {
        try {
            let WatchesCollection = await Watches.findAll();
            if (WatchesCollection && WatchesCollection.length > 0) {
                res.status(200).json({
                    success: true,
                    message: 'Watches List',
                    data: WatchesCollection
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

    async getWatchesDatabyType(req, res) {
        try {
            let WatchesCollection = await Watches.findAll({ where: { type: req.params.type } });
            if (WatchesCollection && WatchesCollection.length > 0) {
                res.status(200).json({
                    success: true,
                    message: 'Watches List',
                    data: WatchesCollection
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

    async getWatchesDatabyId(req, res) {
        try {
            let WatchesCollection = await Watches.findOne({ where: { id: req.params.id } });
            if (WatchesCollection) {
                res.status(200).json({
                    success: true,
                    message: 'Watches List',
                    data: WatchesCollection
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

    async updateWatchesData(req, res) {


        try {
            let WatchesCollection = await Watches.findOne({ where: { id: req.body.id } });
            if (WatchesCollection) {

                if (WatchesCollection.image === req.body.image) {
                    // Do nothing
                }

                else {
                    fs.unlink('./upload/images/' + WatchesCollection.image, (err) => {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            console.log('Image ' + WatchesCollection.image + 'deleted')
                        }
                    })
                }


                Watches.update(req.body, { where: { id: req.body.id } }).then(Watches => {
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

    async deleteWatchesData(req, res) {

        try {
            let WatchesCollection = await Watches.findOne({ where: { id: req.params.id } });
            if (WatchesCollection) {

                Watches.destroy({ where: { id: req.params.id } }).then(Watches => {
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