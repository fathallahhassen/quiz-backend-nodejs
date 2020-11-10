const passport = require('passport');
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;
const usersHelpers = require('../controllers/users');

passport.use(new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password'
		}, (email, password, callback) => {

			//Assume there is a DB module pproviding a global UserModel
			usersHelpers
					.findUserByQuery({email: email.toLowerCase()})
					.then(user => {
						if (!user) {
							return callback(null, false, {message: `Email ${email} not found.`});
						}

						user.comparePassword(password, (err, isMatch) => {
							if (err) {
								return callback(err);
							}
							if (isMatch) {
								return callback(null, user, {message: 'Logged In Successfully'});
							}
							return callback(null, false, {msg: 'Invalid email or password.'});
						});

					})
					.catch(err => {
						return callback(err);
					});
		}
));

passport.use(new JWTStrategy({
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.JWT_KEY
		},
		function (jwtPayload, cb) {

			//find the user in db if needed
			return usersHelpers.getUserById(jwtPayload._id)
					.then(user => {
						return cb(null, user);
					})
					.catch(err => {
						return cb(err);
					});
		}
));
