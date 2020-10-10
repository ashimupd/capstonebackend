const app = module.exports = require('express')();
const userController= require('../controller/user');


app.get('/',   userController.getUsers);
app.post('/',   userController.addUser);




