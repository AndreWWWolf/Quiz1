const express = require("express");
const router = express.Router();
const knex = require("../db/client");

// -= Article Routes =-

// NAME: article#index, METHOD: GET, PATH: /articles
router.get("/", (req, res) => {
  knex("articles")
    .orderBy("createdAt", "DESC")
    .then(articles => {
      // res.send(articles);
      res.render("articles/myClucks", { articles: articles });
    });
});



module.exports = router;





// const express = require("express");
// const router = express.Router();
// const knex = require("../db/client");

// // -= Article Routes =-

// // NAME: article#index, METHOD: GET, PATH: /articles
// router.get("/", (req, res) => {
//   knex("articles")
//     .orderBy("createdAt", "DESC")
//     .then(articles => {
//       // res.send(articles);
//       res.render("articles/myClucks", { articles: articles });
//     });
// });

// // NAME: article#new, METHOD: GET, PATH: /articles/new
// router.get("/newCluck", (req, res) => {
//   res.render("articles/newCluck");
// });

// // NAME: article#create, METHOD: POST, PATH: /articles
// router.post("/", (req, res) => {
//   knex("articles") // --- START SQL
//     .insert({
//       title: req.body.title,
//       content: req.body.content,
//       viewCount: 0
//     })
//     .returning("*") // --- END SQL
//     .then(data => {
//       // get the first value because db data
//       // always comes in an array
//       const article = data[0];
//       // -- EXECUTE SQL
//       res.redirect(`/articles/${article.id}`);
//     });
// });

// // NAME: article#show, METHOD: GET, PATH: /articles/:id
// //            👇 a wildcard match
// router.get("/:id", (req, res) => {
//   // In the path above, all the words prefixed with `:`
//   // are called a wildcard. This wildcard allows access
//   // the in that location of the URL.

//   // You can retrieve values with "req.params". This is an object
//   // similar to "req.query".
//   // Examples:
//   // /:id/:name/:job with url /100/Bob/Labourer
//   // req.params === { id: "100", name: "Bob", job: "Labourer"}
//   const id = req.params.id;

// // NAME: article#destroy, METHOD: DELETE, PATH: /articles/:id
// router.delete("/:id", (req, res) => {
//   const id = req.params.id;

//   knex("articles")
//     .where("id", id)
//     .del()
//     .then(() => {
//       res.redirect("/articles");
//     });
// });

// module.exports = router;
