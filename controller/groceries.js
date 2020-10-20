const Groceries = require('../models').Groceries;
const user = require('../models').User;
const fs = require('fs');

module.exports = {

    async addGroceries(req, res) {
        try {
            await Groceries.create(req.body).then(Groceries => {
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

    async getGroceriesData(req, res) {
        try {
            let GroceriesCollection = await Groceries.findAll();
            if (GroceriesCollection && GroceriesCollection.length > 0) {
                res.status(200).json({
                    success: true,
                    message: 'Groceries List',
                    data: GroceriesCollection
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

    async getGroceriesDatabyType(req, res) {
        try {
            let GroceriesCollection = await Groceries.findAll({where: {type: req.params.type}});
            if (GroceriesCollection && GroceriesCollection.length > 0) {
                res.status(200).json({
                    success: true,
                    message: 'Groceries List',
                    data: GroceriesCollection
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

    async getGroceriesDatabyId(req, res) {
        try {
            let GroceriesCollection = await Groceries.findOne({where: {id: req.params.id}});
            if (GroceriesCollection) {
                res.status(200).json({
                    success: true,
                    message: 'Groceries List',
                    data: GroceriesCollection
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

    async updateGroceriesData(req, res) {

        try {
            let GroceriesCollection = await Groceries.findOne({ where: { id: req.body.id } });
            if (GroceriesCollection) {

                if (GroceriesCollection.image === req.body.image) {
                    // Do nothing
                }
                else {
                    fs.unlink('./upload/images/' + GroceriesCollection.image, (err) => {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            console.log('Image ' + GroceriesCollection.image + 'deleted')
                        }
                    })
                }



                Groceries.update(req.body, { where: { id: req.body.id } }).then(Groceries => {
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

    async deleteGroceriesData(req, res) {

        try {
            let GroceriesCollection = await Groceries.findOne({ where: { id: req.params.id } });
            if (GroceriesCollection) {

                if (GroceriesCollection.image === req.body.image) {
                    // do nothing 
                }

                else {
                    fs.unlink('./upload/images/' + GroceriesCollection.image, (err) => {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            console.log('Image ' + GroceriesCollection.image + 'deleted')
                        }
                    })
                }



                Groceries.destroy({ where: { id: req.params.id } }).then(Groceries => {
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