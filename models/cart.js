'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    productid: {
      type:DataTypes.STRING,
      allowNull:false
    },
    productname: {
      type:DataTypes.STRING,
      allowNull:false
    },
    producttype: {
      type:DataTypes.STRING,
      allowNull:false
    },
    userid: {
      type:DataTypes.STRING,
      allowNull:false
    },
    username: {
      type:DataTypes.STRING,
      allowNull:false
    },
    price: {
      type:DataTypes.STRING,
      allowNull:false
    },

    totalitems:{
      type:DataTypes.STRING,
      allowNull:false,
    },

    image:{
        type:DataTypes.STRING,
        allowNull:false,
      },

    orderstatus:{
        type:DataTypes.STRING,
        allowNull:false,
      },

  }, {});
  Cart.associate = function(models) {
    // associations can be defined here
    
  };
  return Cart;
};