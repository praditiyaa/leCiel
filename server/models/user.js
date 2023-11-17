'use strict';
const { Model } = require('sequelize');
const { hash } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.History, { foreignKey: 'userId' });
      this.hasMany(models.ReadingList, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Full Name cannot be empty',
          },
          notNull: {
            msg: 'Full Name cannot be empty',
          },
        },
      },
      username: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Email already been taken',
        },
        validate: {
          notEmpty: {
            msg: 'Email cannot be empty',
          },
          notNull: {
            msg: 'Email cannot be empty',
          },
          isEmail: {
            msg: 'Need to be an Email',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Password cannot be empty',
          },
          notNull: {
            msg: 'Password cannot be empty',
          },
          len: {
            args: [5],
            msg: 'Password length need to be more than 5 character',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  User.beforeCreate((inst) => {
    inst.password = hash(inst.password);
  });
  return User;
};
