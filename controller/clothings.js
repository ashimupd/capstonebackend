const Clothings = require('../models').Clothings;
const user = require('../models').User;
const fs = require('fs');

module.exports = {

    async addClothings(req, res) {
        try {
            await Clothings.create(req.body).then(Clothings => {
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

    async getClothingsData(req, res) {
        try {
            let ClothingsCollection = await Clothings.findAll();
            if (ClothingsCollection && ClothingsCollection.length > 0) {
                res.status(200).json({
                    success: true,
                    message: 'Clothings List',
                    data: ClothingsCollection
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


    async getClothingsDatabyType(req, res) {
        try {
            let ClothingsCollection = await Clothings.findAll({ where: { type: req.params.type } });
            if (ClothingsCollection && ClothingsCollection.length > 0) {
                res.status(200).json({
                    success: true,
                    message: 'Clothings List',
                    data: ClothingsCollection
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

    async getClothingsDatabyId(req, res) {
        try {
            let ClothingsCollection = await Clothings.findOne({ where: { id: req.params.id } });
            if (ClothingsCollection) {
                res.status(200).json({
                    success: true,
                    message: 'Clothings List',
                    data: ClothingsCollection
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

    async updateClothingsData(req, res) {

        try {
            let ClothingsCollection = await Clothings.findOne({ where: { id: req.body.id } });
            if (ClothingsCollection) {

                if (ClothingsCollection.image === req.body.image) {
                    // do nothing
                }
                else {
                    fs.unlink('./upload/images/' + ClothingsCollection.image, (err) => {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            console.log('Image ' + ClothingsCollection.image + 'deleted')
                        }
                    })
                }



                Clothings.update(req.body, { where: { id: req.body.id } }).then(Clothings => {
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

    async deleteClothingsData(req, res) {

        try {
            let ClothingsCollection = await Clothings.findOne({ where: { id: req.params.id } });
            if (ClothingsCollection) {

                fs.unlink('./upload/images/' + ClothingsCollection.image, (err) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log('Image ' + ClothingsCollection.image + 'deleted')
                    }
                })

                Clothings.destroy({ where: { id: req.params.id } }).then(Clothings => {
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