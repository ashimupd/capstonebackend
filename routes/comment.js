const app = module.exports = require('express')();
const commentController= require('../controller/comment');
const auth= require('../auth/auth')


app.post('/', auth,  commentController.addComment);
app.get('/:producttype/:productid',  commentController.getCommentsData);
// app.get('/',   userController.signup);




