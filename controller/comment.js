const comment = require('../models').Comment;
const bcrypt = require('bcrypt');
const config = require('../config')
const jwt = require('jsonwebtoken')

module.exports = {

    async addComment(req, res) {
        try {

            await comment.create(req.body).then(comment => {
                res.status(200).json({
                    success: true,
                    message: 'New comment added'
                })
            });
        }

        catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    },

    async getCommentsData(req, res) {
        try {
            let commentsCollection = await comment.findAll({
                where:
                {
                    producttype: req.params.producttype,
                    productid: req.params.productid
                },
                order: [
                    ['id', 'DESC']
                ]
            });
            if (commentsCollection && commentsCollection.length > 0) {
                res.status(200).json({
                    success: true,
                    message: 'Comments List',
                    data: commentsCollection
                })
            }

            else {
                res.status(200).json({
                    success: false,
                    message: 'No comments in the list',
                })
            }
        }
        catch (e) {
            res.status(500).send(e)
        }
    },
}