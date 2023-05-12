var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/user');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const postRouter = require('./routes/post');
const signUpRouter = require('./routes/sign-up');
const signInRouter = require('./routes/sign-in')

var app = express();

require('dotenv').config();

const mongoose = require('mongoose');
const { mainModule } = require('process');
mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGO_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

passport.use(
  new LocalStrategy(async(username, password, done) => {
      try {
          const user = await User.findOne({ username: username });
          if(!user) {
              return done(null, false, { message: 'Incorrect Username' });
          };
          bcrypt.compare(password, user.password, (err, res) => {
              if(res) {
                  return done(null, user);
              } else {
                  return done(null, false, { message: 'Incorrect Password'});
              }
          })
      } catch(err) {
          return done(err);
      }
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
      const user = await User.findById(id);
      done(null, user);
  } catch(err) {
      done(err);
  }
});

app.use(session({ secret:'secret code', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/post', postRouter);
app.use('/sign-up', signUpRouter);
app.use('/sign-in', signInRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
