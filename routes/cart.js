const app = module.exports = require('express')();
const cartController= require('../controller/cart');
const auth= require('../auth/auth')

app.post('/', auth, cartController.addToCart);
app.get('/', auth, cartController.getcartAllData);
app.get('/:userid', auth, cartController.getUserAllCartData);
app.get('/:userid/:id', auth, cartController.getUserSingleDataForCheckout);
app.delete('/:id', auth, cartController.deleteCartData);

app.put('/', auth, cartController.placeSingleOrder);
app.put('/checkoutall', auth, cartController.placeAllOrder);
app.put('/admin', auth, cartController.changeOrderStatus);

app.get('/user/orders/:userid', auth, cartController.getUserOrderedData);
app.get('/admin/orders/all', auth, cartController.getUserOrderedDataForAdmin);


