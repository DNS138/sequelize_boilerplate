const Joi = require('joi')

'use strict';
const {
  Model
} = require('sequelize');
exports.project = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
    
      Product.belongsTo(models.Category, {
        foreignKey: "CategoryId",
      })
    }
    
    
  };
  Project.init({
    title: DataTypes.STRING,
    Category: DataTypes.INTEGER,
    description: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};

exports.validate = function validateProject(project) {
  const schema = Joi.object({
      title: Joi.string().min(5).max(255).required(),
      categoryId: Joi.number().required(),
      description: Joi.string().min(10).max(500).required()
  });
  return schema.validate(project);
}