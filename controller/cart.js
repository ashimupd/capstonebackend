const cart = require('../models').Cart;

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

    async getcartData(req, res) {
        try {
            let cartCollection = await cart.findAll({ where: { userid: req.params.userid } });
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

    async deleteCartData(req, res){
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

    }


}
