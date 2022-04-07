'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        
        queryInterface.createTable('Category', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          name: {
            type: Sequelize.STRING,
            len: [2,50],
            trim: true
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          }
        }, { transaction: t }),
        queryInterface.addColumn(
          'Project', // name of Source model
          'CategoryId', // name of the key we're adding 
          {
            type: Sequelize.INTEGER,
            // references: {
            //   model: {
            //     tableName: 'category',
            //     schema: 'schema'
            //   },
            //   key: 'id', // key in Target model that we're referencing
            // },
            // onUpdate: 'CASCADE',
            // onDelete: 'SET NULL',
          }, { transaction: t })
        
      ]);
    });
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.dropTable('Category', { transaction: t }),
        queryInterface.removeColumn('Project', 'categoryId', { transaction: t }),
      ]);
    });
  }
};
