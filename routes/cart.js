const app = module.exports = require('express')();
const cartController= require('../controller/cart');
const auth= require('../auth/auth')

app.post('/', auth, cartController.addToCart);
app.get('/', auth, cartController.getcartAllData);
app.get('/:userid', auth, cartController.getcartData);
app.delete('/:id', auth, cartController.deleteCartData);