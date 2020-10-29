const app = module.exports = require('express')();
const ShoesController= require('../controller/shoes');
const auth= require('../auth/auth')


app.post('/', auth, ShoesController.addShoes);
app.get('/', auth, ShoesController.getShoesData);
app.put('/', auth, ShoesController.updateShoesData);
app.delete('/:id', auth, ShoesController.deleteShoesData);


app.get('/:type', ShoesController.getShoesDatabyType);
app.get('/id/:id', ShoesController.getShoesDatabyId);



