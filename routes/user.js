const app = module.exports = require('express')();
const userController= require('../controller/user');
const auth= require('../auth/auth')


app.get('/', auth,  userController.getUsers);
app.post('/',   userController.signup);
app.post('/login',   userController.login);
app.post('/logout',   userController.logout);




