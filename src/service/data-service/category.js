'use strict';

class CategoryService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll() {
    const categories = this._articles.reduce((acc, article) => {
      article.category.forEach((category) => {
        if (category !== `1`) {
          acc.add(category);
        }
      });
      return acc;
    }, new Set());

    return [...categories];
  }
}

module.exports = CategoryService;
