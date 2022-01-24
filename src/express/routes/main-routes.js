'use strict';

const {Router} = require(`express`);
const api = require(`../api`).getAPI();
const upload = require(`../middlewares/multer-upload`);
const {prepareErrors} = require(`../../utils`);

const ARTICLES_PER_PAGE = 8;

const mainRouter = new Router();

mainRouter.get(`/`, async (req, res) => {
  let {page = 1} = req.query;
  page = +page;

  const limit = ARTICLES_PER_PAGE;

  const offset = (page - 1) * ARTICLES_PER_PAGE;
  const [
    {count, articles},
    categories
  ] = await Promise.all([
    api.getArticles({limit, offset}),
    api.getCategories(true) // опциональный аргумент
  ]);

  const totalPages = Math.ceil(count / ARTICLES_PER_PAGE);

  res.render(`main`, {articles, categories, page, totalPages});
});

mainRouter.post(`/register`, upload.single(`avatar`), async (req, res) => {
  const {body, file} = req;
  const userData = {
    avatar: file ? file.filename : ``,
    name: body[`name`],
    surname: body[`surname`],
    email: body[`email`],
    password: body[`password`],
    passwordRepeated: body[`repeat-password`],
    role: `reader`
  };
  try {
    await api.createUser(userData);
    res.redirect(`/login`);
  } catch (errors) {
    const validationMessages = prepareErrors(errors);
    const {user} = req.session;
    res.render(`sign-up`, {validationMessages, user});
  }
});

mainRouter.get(`/login`, (req, res) => res.render(`login`));

mainRouter.get(`/search`, async (req, res) => {
  const {query} = req.query;
  try {
    const results = await api.search(query);

    res.render(`search-result`, {results, query});
  } catch (error) {
    res.render(`search-empty`, {query});
  }
});

mainRouter.get(`/register`, (req, res) => res.render(`sign-up`));

mainRouter.get(`/categories`, (req, res) => res.render(`all-categories`));

module.exports = mainRouter;
