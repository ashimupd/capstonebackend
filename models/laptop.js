'use strict';
module.exports = (sequelize, DataTypes) => {
  const Laptop = sequelize.define('Laptop', {
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
    ram: {
      type:DataTypes.STRING,
      allowNull:false
    },

    storage: {
      type:DataTypes.STRING,
      allowNull:false
    },

    processer: {
      type:DataTypes.STRING,
      allowNull:false
    },


    generation: {
      type:DataTypes.STRING,
      allowNull:false
    },

    graphics: {
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
  Laptop.associate = function(models) {
    // associations can be defined here
  };
  return Laptop;
};