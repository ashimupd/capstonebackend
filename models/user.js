'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fname: {
      type:DataTypes.STRING,
      allowNull:false
    },
    lname: {
      type:DataTypes.STRING,
      allowNull:false
    },
    phone: {
      type:DataTypes.STRING,
      allowNull:false
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false
    },
    state: {
      type:DataTypes.STRING,
      allowNull:false
    },
    zip: {
      type:DataTypes.STRING,
      allowNull:false
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false
    },

    usertype:{
      type:DataTypes.STRING,
      allowNull:false,
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    
  };
  return User;
};