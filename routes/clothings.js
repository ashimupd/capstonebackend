const app = module.exports = require('express')();
const clothingsController = require('../controller/clothings');
const auth = require('../auth/auth')


app.post('/', auth, clothingsController.addClothings);
app.get('/', auth, clothingsController.getClothingsData);
app.put('/', auth, clothingsController.updateClothingsData);
app.delete('/:id', auth, clothingsController.deleteClothingsData);

app.get('/:type', clothingsController.getClothingsDatabyType);
app.get('/id/:id', clothingsController.getClothingsDatabyId);



