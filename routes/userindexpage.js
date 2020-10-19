const app = module.exports = require('express')();
const UserindexpageController= require('../controller/userindexpage');
const auth= require('../auth/auth')


app.post('/', auth, UserindexpageController.addUserindexpage);
app.get('/', auth, UserindexpageController.getUserindexpageData);
app.put('/', auth, UserindexpageController.updateUserindexpageData);
app.delete('/:id', auth, UserindexpageController.deleteUserindexpageData);

app.get('/:type', UserindexpageController.getUserIndexDatabyType);



