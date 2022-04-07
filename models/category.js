
'use strict';

function category_Schema(sequelize, Sequelize){
  const Category = sequelize.define("Category", {
    name: Sequelize.DataTypes.STRING
  },{});

    
    Category.associate = function(models){
      Category.hasMany(models.Project, {
        foreignKey: "CategoryId",
      });
    };
  return Category;
}

module.exports.category = category_Schema;
