module.exports = app= require('express')();

app.get('/', (req, res)=>{res.send({message:'server is on'})})

app.use('/user', require('./user'))
app.use('/upload', require('./upload'))
app.use('/clothings', require('./clothings'))
app.use('/shoes', require('./shoes'))
app.use('/watches', require('./watches'))
app.use('/groceries', require('./groceries'))
app.use('/mobiles', require('./mobiles'))
app.use('/tablet', require('./tablet'))
app.use('/laptop', require('./laptop'))
app.use('/tv', require('./tv'))
app.use('/userindexpage', require('./userindexpage'))