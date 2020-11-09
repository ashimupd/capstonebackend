const Laptop = require('../models').Laptop;
const fs = require('fs');

module.exports = {

    async addLaptop(req, res) {
        try {
            await Laptop.create(req.body).then(Laptop => {
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

    async getLaptopData(req, res) {
        try {
            let LaptopCollection = await Laptop.findAll();
            if (LaptopCollection && LaptopCollection.length > 0) {
                res.status(200).json({
                    success: true,
                    message: 'Laptop List',
                    data: LaptopCollection
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

    async getLaptopDatabyId(req, res) {
        try {
            let LaptopCollection = await Laptop.findOne({ where: { id: req.params.id } });
            if (LaptopCollection) {
                res.status(200).json({
                    success: true,
                    message: 'Laptop List',
                    data: LaptopCollection
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



    async updateLaptopData(req, res) {

        console.log(req.body)

        try {
            let LaptopCollection = await Laptop.findOne({ where: { id: req.body.id } });
            if (LaptopCollection) {

                if (LaptopCollection.image === req.body.image) {
                    // do nothing
                }
                else {
                    fs.unlink('./upload/images/' + LaptopCollection.image, (err) => {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            console.log('Image ' + LaptopCollection.image + 'deleted')
                        }
                    })
                }



                Laptop.update(req.body, { where: { id: req.body.id } }).then(Laptop => {
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

    async deleteLaptopData(req, res) {

        try {
            let LaptopCollection = await Laptop.findOne({ where: { id: req.params.id } });
            if (LaptopCollection) {


                Laptop.destroy({ where: { id: req.params.id } }).then(Laptop => {
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