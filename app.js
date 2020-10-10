const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
var routes = require('./routes');
const db = require('./models')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());



app.use(routes);

db.sequelize.sync().then(() => {
    app.listen(8080);
})