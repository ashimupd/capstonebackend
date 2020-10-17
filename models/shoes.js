'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shoes = sequelize.define('Shoes', {
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    type: {
      type:DataTypes.STRING,
      allowNull:false
    },
    size: {
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
  Shoes.associate = function(models) {
    // associations can be defined here
  };
  return Shoes;
};