DROP TABLE IF EXISTS article_categories;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS articles;

CREATE TABLE users
(
  id            integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  email         varchar(50) UNIQUE NOT NULL,
  first_name    varchar(50)        NOT NULL,
  last_name     varchar(50)        NOT NUll,
  password_hash varchar(50)        NOT NULL,
  avatar        varchar(15)        NOT NULL
);

CREATE TABLE categories
(
  id   integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(50) NOT NULL
);

CREATE TABLE articles
(
  id           integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title        varchar(255) NOT NULL,
  created_at   timestamp DEFAULT CURRENT_TIMESTAMP,
  category_id  integer      NOT NULL,
  picture      varchar(15),
  article_text text         NOT NULL
);

CREATE TABLE comments
(
  id           integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  comment_text text    NOT NULL,
  created_at   timestamp DEFAULT CURRENT_TIMESTAMP,
  user_id      integer NOT NULL,
  article_id   integer NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (article_id) REFERENCES articles (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE article_categories
(
  article_id  integer NOT NULL,
  category_id integer NOT NULL,
  PRIMARY KEY (article_id, category_id),
  FOREIGN KEY (article_id) REFERENCES articles (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE INDEX ON articles (title);

