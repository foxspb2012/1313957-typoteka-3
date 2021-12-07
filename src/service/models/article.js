'use strict';

const {DataTypes, Model} = require(`sequelize`);

class Article extends Model {

}

const define = (sequelize) => Article.init({
  title: {
    // eslint-disable-next-line new-cap
    type: DataTypes.STRING(250),
    allowNull: false
  },
  // eslint-disable-next-line new-cap
  picture: DataTypes.STRING(50),
  announce: {
    // eslint-disable-next-line new-cap
    type: DataTypes.STRING(250),
    allowNull: false
  },
  fullText: {
    // eslint-disable-next-line new-cap
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  sequelize,
  modelName: `Article`,
  tableName: `articles`
});

module.exports = define;
