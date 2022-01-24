'use strict';

const {DataTypes, Model} = require(`sequelize`);

class User extends Model {

}

const define = (sequelize) => User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  modelName: `User`,
  tableName: `users`
});

module.exports = define;
