const express = require("express");
const router = express.Router();
const knex = require("../db/client");

// -= Article Routes =-

// NAME: article#index, METHOD: GET, PATH: /articles
router.get("/", (req, res) => {
  knex("clucks")
    .orderBy("createdAt", "DESC")
    .then(articles => {
      // res.send(articles);
      res.render("articles/myClucks", { articles: articles });
    });
});

// NAME: article#new, METHOD: GET, PATH: /articles/newCluck
router.get("/newCluck", (req, res) => {

  res.render("articles/newCluck");
});

// NAME: article#create, METHOD: POST, PATH: /articles
router.post("/", (req, res) => {
    console.log(req.body.username);
  knex("clucks") // --- START SQL
    .insert({
      username: req.cookies.username,
      content: req.body.content,
      image_url: req.body.image_url,

    })
    .returning("*") // --- END SQL
    .then(() => {
      res.redirect("/articles/myClucks");
    });
});

// NAME: article#show, METHOD: GET, PATH: /articles/:id
//            👇 a wildcard match
router.get("/:id", (req, res) => {
  // In the path above, all the words prefixed with `:`
  // are called a wildcard. This wildcard allows access
  // the in that location of the URL.

  // You can retrieve values with "req.params". This is an object
  // similar to "req.query".
  // Examples:
  // /:id/:name/:job with url /100/Bob/Labourer
  // req.params === { id: "100", name: "Bob", job: "Labourer"}
  const id = req.params.id;

  knex("clucks")
  .where("id", id)
  .first() // when an array is returned as data, only return the first value
  .then(article => {
    if (article) {
      res.render("articles/show", { article: article });
    } else {
      res.send(`Cannot find article with id=${id}`);
    }
  });
});

// NAME: article#destroy, METHOD: DELETE, PATH: /articles/:id
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  knex("clucks")
    .where("id", id)
    .del()
    .then(() => {
      res.redirect("/articles");
    });
});

module.exports = router;
