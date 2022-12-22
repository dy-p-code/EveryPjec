'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, { foreignKey: 'userId' });

      this.hasMany(models.Comments, {
        as: 'Comments',
        foreignKey: 'postId',
      });
      this.hasMany(models.Alerts, {
        as: 'Alerts',
        foreignKey: 'postId',
      });
      this.hasMany(models.Picks, {
        as: 'Picks',
        foreignKey: 'postId',
      });
    }
  }
  Posts.init(
    {
      postId: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'userId',
        },
        onDelete: 'cascade',
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT, // long-text ?
        allowNull: false,
      },
      division: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      onoff: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      period: {
        type: DataTypes.STRING, // date? or string?
        allowNull: false,
      },
      stack: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startDate: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Posts',
    }
  );
  return Posts;
};
