require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');

const session      = require("express-session");
const passport     = require('passport');

 require('./configs/passport');
const MongoStore   = require('connect-mongo')(session);
const flash        = require("connect-flash");

const cors         = require('cors');
    

mongoose
  .connect('mongodb://localhost/server', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));


// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));


  

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';


// Enable authentication using session + passport
app.use(session({
  secret: 'irongenerator',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore( { mongooseConnection: mongoose.connection })
}))

// USE passport.initialize() and passport.session() HERE:
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

    

const index = require('./routes/index');
app.use('/api', index);

const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);
    
app.use((req, res, next) => {
  // If no routes match, send them the React HTML.
   res.sendFile(__dirname + "/public/index.html");
  });

module.exports = app;
