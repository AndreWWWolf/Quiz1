const express = require("express");
const router = express.Router();
const knex = require("../db/client");

// -= Article Routes =-
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
      created_at: req.body.createdAt
    })
    .returning("*") // --- END SQL
    .then(() => {
      res.redirect("/articles/myClucks");
    });
});

// NAME: article#index, METHOD: GET, PATH: /articles
router.get("/", (req, res) => {
    knex("clucks")
      .orderBy("created_at", "DESC")
      .then(clucks => {
        res.render("articles/myClucks", { clucks: clucks });
      });
  });

module.exports = router;
