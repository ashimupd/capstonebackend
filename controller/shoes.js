const Shoes = require('../models').Shoes;
const user = require('../models').User;
const fs = require('fs');

module.exports = {

    async addShoes(req, res) {
        try {
            await Shoes.create(req.body).then(Shoes => {
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

    async getShoesData(req, res) {
        try {
            let ShoesCollection = await Shoes.findAll();
            if (ShoesCollection && ShoesCollection.length > 0) {
                res.status(200).json({
                    success: true,
                    message: 'Shoes List',
                    data: ShoesCollection
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

    async getShoesDatabyType(req, res) {
        try {
            let ShoesCollection = await Shoes.findAll({ where: { type: req.params.type } });
            if (ShoesCollection && ShoesCollection.length > 0) {
                res.status(200).json({
                    success: true,
                    message: 'Shoes List',
                    data: ShoesCollection
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

    async getShoesDatabyId(req, res) {
        try {
            let ShoesCollection = await Shoes.findOne({ where: { id: req.params.id } });
            if (ShoesCollection) {
                res.status(200).json({
                    success: true,
                    message: 'Shoes List',
                    data: ShoesCollection
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


    async updateShoesData(req, res) {


        try {
            let ShoesCollection = await Shoes.findOne({ where: { id: req.body.id } });
            if (ShoesCollection) {

                if (ShoesCollection.image === req.body.image) {
                    // do nothing 
                }

                else {
                    fs.unlink('./upload/images/' + ShoesCollection.image, (err) => {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            console.log('Image ' + ShoesCollection.image + 'deleted')
                        }
                    })
                }

                Shoes.update(req.body, { where: { id: req.body.id } }).then(Shoes => {
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

    async deleteShoesData(req, res) {

        try {
            let ShoesCollection = await Shoes.findOne({ where: { id: req.params.id } });
            if (ShoesCollection) {

                if (ShoesCollection.image === req.body.image) {
                    // do nothing 
                }

                else {
                    fs.unlink('./upload/images/' + ShoesCollection.image, (err) => {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            console.log('Image ' + ShoesCollection.image + 'deleted')
                        }
                    })
                }



                Shoes.destroy({ where: { id: req.params.id } }).then(Shoes => {
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