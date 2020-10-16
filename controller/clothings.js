const clothings = require('../models').Clothings;
const user = require('../models').User;
const fs = require('fs');

module.exports = {

    async addClothings(req, res) {
        try {
            await clothings.create(req.body).then(clothings => {
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
            let clothingsCollection = await clothings.findAll();
            if (clothingsCollection && clothingsCollection.length > 0) {
                res.status(200).json({
                    success: true,
                    message: 'clothings List',
                    data: clothingsCollection
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
            let clothingsCollection = await clothings.findOne({ where: { id: req.body.id } });
            if (clothingsCollection) {
                
                fs.unlink('./upload/images/' + clothingsCollection.image, (err) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log('Image ' + clothingsCollection.image + 'deleted')
                    }
                })

                clothings.update(req.body, { where: { id: req.body.id } }).then(clothings => {
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

    async deleteClothindData(req, res) {

        try {
            let clothingsCollection = await clothings.findOne({ where: { id: req.params.id } });
            if (clothingsCollection) {

                fs.unlink('./upload/images/' + clothingsCollection.image, (err) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log('Image ' + clothingsCollection.image + 'deleted')
                    }
                })

                clothings.destroy({ where: { id: req.params.id } }).then(clothings => {
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