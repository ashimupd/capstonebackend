module.exports = app= require('express')();

app.get('/', (req, res)=>{res.send({message:'server is on'})})

app.use('/user', require('./user'))