'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Posts, {
        as: 'Posts',
        foreignKey: 'userId',
      });
      this.hasMany(models.Comments, {
        as: 'Comments',
        foreignKey: 'userId',
      });
      this.hasMany(models.Alerts, {
        as: 'Alerts',
        foreignKey: 'userId',
      });
      this.hasMany(models.Picks, {
        as: 'Picks',
        foreignKey: 'userId',
      });
    }
  }
  Users.init(
    {
      userId: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      loginId: {
        unique: true,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nickname: {
        unique: true,
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING, // url
        allowNull: false,
      },
      stack: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      refreshToken: {
        type: DataTypes.STRING,
        allowNull: true,
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
      modelName: 'Users',
    }
  );
  return Users;
};
