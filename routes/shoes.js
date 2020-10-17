const app = module.exports = require('express')();
const ShoesController= require('../controller/Shoes');
const auth= require('../auth/auth')


app.post('/', auth, ShoesController.addShoes);
app.get('/', auth, ShoesController.getShoesData);
app.put('/', auth, ShoesController.updateShoesData);
app.delete('/:id', auth, ShoesController.deleteShoesData);



