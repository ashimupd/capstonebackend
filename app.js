const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models')
const morgan = require("morgan");
var routes = require('./routes');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(morgan("dev"))

app.use(routes);
app.use("/upload/images", express.static("upload/images"));

db.sequelize.sync().then(() => {
    app.listen(2020);
})