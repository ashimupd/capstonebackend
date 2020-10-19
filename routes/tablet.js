const app = module.exports = require('express')();
const tabletController= require('../controller/tablet');
const auth= require('../auth/auth')


app.post('/', auth, tabletController.addTablet);
app.get('/', auth, tabletController.getTabletData);
app.put('/', auth, tabletController.updateTabletData);
app.delete('/:id', auth, tabletController.deleteTabletData);



