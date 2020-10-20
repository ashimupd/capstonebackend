const app = module.exports = require('express')();
const tvController= require('../controller/tv');
const auth= require('../auth/auth')


app.post('/', auth, tvController.addTV);
app.put('/', auth, tvController.updateTVData);
app.delete('/:id', auth, tvController.deleteTVData);


app.get('/', tvController.getTVData);
app.get('/id/:id', tvController.getTVDatabyid);

