const app = module.exports = require('express')();
const mobilesController= require('../controller/mobiles');
const auth= require('../auth/auth')


app.post('/', auth, mobilesController.addMobiles);
app.put('/', auth, mobilesController.updateMobilesData);
app.delete('/:id', auth, mobilesController.deleteMobilesData);


app.get('/', mobilesController.getMobilesData);
app.get('/id/:id', mobilesController.getMobilesDatabyId);

