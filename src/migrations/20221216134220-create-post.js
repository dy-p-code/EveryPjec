'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      postId: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        //   references: {
        //     model: 'Users',
        //     key: 'userId',
        //   },
        //   onDelete: 'cascade',
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING, // long-text ?
        allowNull: false,
      },
      division: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      onoff: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      period: {
        type: Sequelize.STRING, // date? or string?
        allowNull: false,
      },
      stack: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      contact: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  },
};
