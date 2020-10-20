const app = module.exports = require('express')();
const GroceriesController = require('../controller/Groceries');
const auth = require('../auth/auth')


app.post('/', auth, GroceriesController.addGroceries);
app.get('/', auth, GroceriesController.getGroceriesData);
app.put('/', auth, GroceriesController.updateGroceriesData);
app.delete('/:id', auth, GroceriesController.deleteGroceriesData);

app.get('/:type', GroceriesController.getGroceriesDatabyType);
app.get('/id/:id', GroceriesController.getGroceriesDatabyId);


