'use strict';
module.exports = (sequelize, DataTypes) => {
  const TV = sequelize.define('TV', {
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    brand: {
      type:DataTypes.STRING,
      allowNull:false
    },
    model: {
      type:DataTypes.STRING,
      allowNull:false
    },

    type: {
      type:DataTypes.STRING,
      allowNull:false
    },

    resolution: {
      type:DataTypes.STRING,
      allowNull:false
    },

    screensize: {
      type:DataTypes.STRING,
      allowNull:false
    },

    warrenty: {
      type:DataTypes.INTEGER,
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
  TV.associate = function(models) {
    // associations can be defined here
  };
  return TV;
};