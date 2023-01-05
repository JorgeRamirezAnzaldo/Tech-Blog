//Import path
const path = require('path');
//Import express
const express = require('express');
//Import express-session
const session = require('express-session');
//Import express-handlebars
const exphbs = require('express-handlebars');
//Import connect-session-sequelize
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { strict } = require('assert');
//Import the controllers
const routes = require('./controllers');
//Import the sequelize connection
const sequelize = require('./config/connection');
//Import the helpers
const helpers = require('./utils/helpers');

//Initialize app variable
const app = express();
//Define PORT
const PORT = process.env.PORT || 3001;

//Configure sessions
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 120000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
//Make the app use the configured sessions
app.use(session(sess));

const hbs = exphbs.create({ helpers });
//Set Handlebars as prdetermined template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Configure the app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//Configure the app to use the routes contained in the controllers
app.use(routes);

//Sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
