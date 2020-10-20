'use strict';
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        comments: {
            type: DataTypes.STRING,
            allowNull: false
        },
        producttype: {
            type: DataTypes.STRING,
            allowNull: false
        },
        productid: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {});
    Comment.associate = function (models) {
        // associations can be defined here

    };
    return Comment;
};