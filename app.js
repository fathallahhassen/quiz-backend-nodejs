const express = require('express');
const path = require('path');
const session = require('cookie-session');
const app = express();
const helmet = require('helmet');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
var compression = require('compression');
const logger = require('morgan');
const dotEnv = require('dotenv');
const passport = require('passport');
app.use(passport.initialize());

// session config
const sessionOptions = {
	name: 'session',
	keys: ['key1', 'key2'],
	saveUninitialized: true,
	secret: process.env.SESSION_SECRET,
	resave: true,
	cookie: {
		secure: true,
		maxAge: 60 * 60 * 1000 // 1 hour for as example
	}
};

// ENV variables
dotEnv.config();

// routes require
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const apisRouter = require('./routes/apis');
const questionsRouter = require('./routes/questions');
const auth = require('./routes/auth');
require('./helpers/passport');


// middleware
const middleware = require('./helpers/middlewares');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// Express Configuration
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sessionOptions));
app.use(compression());
app.use(middleware.allowCrossDomain);

// ROUTING
app.use('/', indexRouter);
app.use('/user', passport.authenticate('jwt', {session: false}), usersRouter);
app.use('/auth', auth);
app.use('/users', usersRouter);
app.use('/api', apisRouter);
app.use('/questions', questionsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(middleware.errorHandler);


module.exports = app;
