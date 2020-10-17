const app = module.exports = require('express')();
const mobilesController= require('../controller/mobiles');
const auth= require('../auth/auth')


app.post('/', auth, mobilesController.addMobiles);
app.get('/', auth, mobilesController.getMobilesData);
app.put('/', auth, mobilesController.updateMobilesData);
app.delete('/:id', auth, mobilesController.deleteMobilesData);



