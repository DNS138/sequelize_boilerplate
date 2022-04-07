'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Project', {
      fields: ['CategoryId'],
      type: 'foreign key',
      name: 'custom_fKey',
      references: { //Required field
        table: 'category',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
     queryInterface.removeConstraint('Project', "custom_fKey")
  }
};
