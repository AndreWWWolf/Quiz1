const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    response.render('homePage');
  });


  const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;
  router.post('/signIn', (request, response) => {
    const username = request.body.username;
    response.cookie('username', username, { maxAge: COOKIE_MAX_AGE });
    response.redirect('/views/articles/myClucks');
  });
  
  router.post('/signOut', (request, response) => {
    response.clearCookie('username');
  
    response.redirect('/');
  });


  module.exports = router;