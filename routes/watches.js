const app = module.exports = require('express')();
const WatchesController= require('../controller/Watches');
const auth= require('../auth/auth')


app.post('/', auth, WatchesController.addWatches);
app.get('/', auth, WatchesController.getWatchesData);
app.put('/', auth, WatchesController.updateWatchesData);
app.delete('/:id', auth, WatchesController.deleteWatchesData);



