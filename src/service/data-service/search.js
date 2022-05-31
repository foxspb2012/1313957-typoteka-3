'use strict';

const {Sequelize, Op} = require(`sequelize`);

class SearchService {
  constructor(sequelize) {
    this._Article = sequelize.models.Article;
  }

  async findAll(searchText) {
    const articles = await this._Article.findAll(
      {
        attributes: [
          `id`,
          `title`,
          `createdAt`
        ],
        where: {
          title: {
            [Op.iLike]: `%${searchText}%`,
          }
        },
        order: [
          [`createdAt`, `DESC`]
        ]
      })
    ;
    return articles.map((article) => article.get());
  }
}

module.exports = SearchService;
