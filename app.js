const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const path = require('path');
const methodOverride = require('method-override');
const rootRouter = require('./routes/root');
const articlesRouter = require('./routes/articles');

const app = express();

app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  methodOverride((req, res) => {
    if (req.body && req.body._method) {
      const method = req.body._method;
      return method;
    }
  })
);

console.log('__dirname:', __dirname);
app.use(express.static(path.join(__dirname, 'public')));

app.use((request, response, next) => {
    console.log("🍪 Cookies:", request.cookies);
    response.locals.username = "";
    const username = request.cookies.username;
    if (username) {
      response.locals.username = username;
    }
    next();
  });

  //ROUTES//
  app.get('/', (request, response) => {
    response.render('homePage');
  });



//Create Cookie && Sign In
  const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;
  app.post('/signIn', (request, response) => {
    const username = request.body.username;
    response.cookie('username', username, { maxAge: COOKIE_MAX_AGE });
    response.redirect('/');
  });
  
//Delete Cookie && SignOut
  app.post('/signOut', (request, response) => {
    response.clearCookie('username');
    response.redirect('/');
  });

  app.use('/', rootRouter);
  app.use('/articles', articlesRouter);

const PORT = 4000;
const ADDRESS = "localhost";
app.listen(PORT, ADDRESS, () => {
  console.log(`Server listenning on http://${ADDRESS}:${PORT}`);
});




