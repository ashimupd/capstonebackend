const app = module.exports = require('express')();
const laptopController= require('../controller/laptop');
const auth= require('../auth/auth')


app.post('/', auth, laptopController.addLaptop);
app.put('/', auth, laptopController.updateLaptopData);
app.delete('/:id', auth, laptopController.deleteLaptopData);

app.get('/', laptopController.getLaptopData);
app.get('/id/:id', laptopController.getLaptopDatabyId);



