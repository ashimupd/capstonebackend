const TV = require('../models').TV;
const user = require('../models').User;
const fs = require('fs');

module.exports = {

    async addTV(req, res) {
        try {
            await TV.create(req.body).then(TV => {
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

    async getTVData(req, res) {
        try {
            let TVCollection = await TV.findAll();
            if (TVCollection && TVCollection.length > 0) {
                res.status(200).json({
                    success: true,
                    message: 'TV List',
                    data: TVCollection
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

    async getTVDatabyid(req, res) {
        try {
            let TVCollection = await TV.findOne({ where: { id: req.params.id } });
            if (TVCollection) {
                res.status(200).json({
                    success: true,
                    message: 'TV List',
                    data: TVCollection
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

    async updateTVData(req, res) {

        try {
            let TVCollection = await TV.findOne({ where: { id: req.body.id } });
            if (TVCollection) {

                if (TVCollection.image === req.body.image) {
                    // do nothing
                }
                else {
                    fs.unlink('./upload/images/' + TVCollection.image, (err) => {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            console.log('Image ' + TVCollection.image + 'deleted')
                        }
                    })
                }



                TV.update(req.body, { where: { id: req.body.id } }).then(TV => {
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

    async deleteTVData(req, res) {

        try {
            let TVCollection = await TV.findOne({ where: { id: req.params.id } });
            if (TVCollection) {

                TV.destroy({ where: { id: req.params.id } }).then(TV => {
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