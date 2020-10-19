const app = module.exports = require('express')();
const tvController= require('../controller/tv');
const auth= require('../auth/auth')


app.post('/', auth, tvController.addTV);
app.get('/', auth, tvController.getTVData);
app.put('/', auth, tvController.updateTVData);
app.delete('/:id', auth, tvController.deleteTVData);



