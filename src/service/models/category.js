'use strict';

const {DataTypes, Model} = require(`sequelize`);
const Aliase = require(`./aliase`);

class CategoryModel extends Model {

}

const define = (sequelize) => CategoryModel.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: `Category`,
  tableName: `categories`
});

const defineRelations = ({Article, ArticleCategory, Category}) => {
  Category.belongsToMany(Article, {through: ArticleCategory, as: Aliase.ARTICLES});
  Category.hasMany(ArticleCategory, {as: Aliase.ARTICLE_CATEGORIES});
};

module.exports = {define, defineRelations};
