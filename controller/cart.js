const cart = require('../models').Cart;
const { Op } = require("sequelize");

module.exports = {

    async addToCart(req, res) {

        try {
            await cart.create(req.body).then(Shoes => {
                res.status(200).json({
                    success: true,
                    message: req.body.productname + ' addes to cart'
                })
            });


        }
        catch (e) {
            console.log(e)
            res.status(500).send(e)
        }

    },

    async getUserAllCartData(req, res) {
        try {
            let cartCollection = await cart.findAll({ where: { userid: req.params.userid, orderstatus: 'pending' }, });
            if (cartCollection && cartCollection.length > 0) {
                res.status(200).json({
                    success: true,
                    message: 'Cart List',
                    data: cartCollection
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
            console.log(e)
            res.status(500).send(e)
        }
    },

    async getUserOrderedDataForAdmin(req, res) {
        try {
            let cartCollection = await cart.findAll({ where: { [Op.not]: [{ orderstatus: 'pending' }] },  order: [['id', 'DESC']]});
            if (cartCollection && cartCollection.length > 0) {
                res.status(200).json({
                    success: true,
                    message: 'Cart List',
                    data: cartCollection
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
            console.log(e)
            res.status(500).send(e)
        }
    },

    async getUserSingleDataForCheckout(req, res) {
        try {
            let cartCollection = await cart.findOne({ where: { userid: req.params.userid, id: req.params.id, orderstatus: 'pending' },  });
            if (cartCollection) {
                res.status(200).json({
                    success: true,
                    message: 'Cart List',
                    data: cartCollection
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
            console.log(e)
            res.status(500).send(e)
        }
    },


    async getUserOrderedData(req, res) {
        try {
            let cartCollection = await cart.findAll({
                where: { userid: req.params.userid },
                where: { [Op.not]: [{ orderstatus: 'pending' }] },
                order: [['id', 'DESC']]
            });
            if (cartCollection) {
                res.status(200).json({
                    success: true,
                    message: 'Cart List',
                    data: cartCollection
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
            console.log(e)
            res.status(500).send(e)
        }
    },


    async getcartAllData(req, res) {
        try {
            let cartCollection = await Cart.findAll();
            if (cartCollection && cartCollection.length > 0) {
                res.status(200).json({
                    success: true,
                    message: 'Cart List',
                    data: cartCollection
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

    async deleteCartData(req, res) {
        try {
            let cartCollection = await cart.findOne({ where: { id: req.params.id } });
            if (cartCollection) {


                cart.destroy({ where: { id: req.params.id } }).then(Tablet => {
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

    async getUserCartData(req, res) {
        try {
            let cartCollection = await cart.findOne({ where: { userid: req.params.userid, id: req.params.id }, });
            if (cartCollection) {
                res.status(200).json({
                    success: true,
                    message: 'Cart List',
                    data: cartCollection
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
            console.log(e)
            res.status(500).send(e)
        }
    },

    async placeSingleOrder(req, res) {


        try {
            let cartCollection = await cart.findOne({ where: { id: req.body.id, userid: req.body.userid }, });
            if (cartCollection) {
                cart.update({ orderstatus: 'ordered' }, { where: { id: req.body.id, userid: req.body.userid } }).then(cart => {
                    res.status(200).json({
                        success: true,
                        message: req.body.productname + ' ordered successfully',
                    })
                })
            }
            else {
                res.status(200).json({
                    success: false,
                    message: req.body.productname + 'Not found',
                })
            }
        }
        catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    },

    async placeAllOrder(req, res) {

        try {
            let cartCollection = await cart.findAll({ where: { userid: req.body.userid }, });
            if (cartCollection) {
                cart.update({ orderstatus: 'ordered' },
                    {
                        where: { userid: req.body.userid },
                        where: { orderstatus: 'pending' }
                    }).then(cart => {
                        res.status(200).json({
                            success: true,
                            message: 'All items ordered successfully',
                        })
                    })
            }
            else {
                res.status(200).json({
                    success: false,
                    message: 'Items not found',
                })
            }
        }
        catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    },

    async changeOrderStatus(req, res) {

        try {
            let cartCollection = await cart.findOne({ where: { id: req.body.id }, });
            if (cartCollection) {
                cart.update({ orderstatus: req.body.status },
                    {
                        where: { id: req.body.id },
                    }).then(cart => {
                        res.status(200).json({
                            success: true,
                            message: 'All items ordered successfully',
                        })
                    })
            }
            else {
                res.status(200).json({
                    success: false,
                    message: 'Items not found',
                })
            }
        }
        catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    },

}
