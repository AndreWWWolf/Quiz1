const express = require('express');
const router = express.Router();

//Routes to Pages
router.get('/', (request, response) => {
    response.render('homePage');
  });

  router.get('/articles/newCluck', (request, response) => {
      response.render('articles/newCluck')
  });

  router.get('/signIn', (request, response) => {
      response.render('signIn');
  });

  router.get('/articles/myClucks', (request, response) => {
    response.render('articles/myClucks');
  });

//Create Cookie
  const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;
  router.post('/signIn', (request, response) => {
    const username = request.body.username;
    response.cookie('username', username, { maxAge: COOKIE_MAX_AGE });
    response.redirect('articles/myClucks');
  });
//Delete Cookie
  router.post('/signOut', (request, response) => {
    response.clearCookie('username');
    response.redirect('/');
  });


  module.exports = router;