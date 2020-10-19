'use strict';
module.exports = (sequelize, DataTypes) => {
  const Userindexpage = sequelize.define('Userindexpage', {
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    type: {
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
  Userindexpage.associate = function(models) {
    // associations can be defined here
  };
  return Userindexpage;
};