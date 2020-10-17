'use strict';
module.exports = (sequelize, DataTypes) => {
  const Groceries = sequelize.define('Groceries', {
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    pricevolume: {
      type:DataTypes.STRING,
      allowNull:false
    },
   
    price: {
      type:DataTypes.STRING,
      allowNull:false
    },
    description: {
      type:DataTypes.STRING,
      allowNull:false
    },
    image: {
      type:DataTypes.STRING
    },
  }, {});
  Groceries.associate = function(models) {
    // associations can be defined here
  };
  return Groceries;
};