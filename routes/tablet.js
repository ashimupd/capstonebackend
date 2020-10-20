const app = module.exports = require('express')();
const tabletController= require('../controller/tablet');
const auth= require('../auth/auth')


app.post('/', auth, tabletController.addTablet);
app.put('/', auth, tabletController.updateTabletData);
app.delete('/:id', auth, tabletController.deleteTabletData);


app.get('/', tabletController.getTabletData);
app.get('/id/:id', tabletController.getTabletDatabyId);



