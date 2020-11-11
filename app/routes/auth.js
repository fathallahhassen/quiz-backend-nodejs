const express = require('express');
const router = express.Router();
const validator = require('validator');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../models/user');


const usersHelpers = require('../controllers/users');

/* POST login. */
router.post('/login', function (req, res, next) {

	passport.authenticate('local', {session: false}, (err, user, info) => {
		console.log(err);
		if (err || !user) {
			return res.status(400).json({
				message: info ? info.message : 'Login failed',
				user: user
			});
		}

		req.login(user, {session: false}, (err) => {
			if (err) {
				res.send(err);
			}

			const token = jwt.sign(user.toJSON(), process.env.JWT_KEY, { expiresIn: '1h' });

			return res.json({user, token});
		});
	})
	(req, res);

});

/* POST login. */
router.post('/register', function (req, res, next) {
	const validationErrors = [];
	if (!validator.isEmail(req.body.email)) validationErrors.push({message: 'Please enter a valid email address.'});
	if (!validator.isLength(req.body.password, {min: 8})) validationErrors.push({message: 'Password must be at least 8 characters long'});
	if (req.body.password !== req.body.passwordConfirmation) validationErrors.push({message: 'Passwords do not match'});

	if (validationErrors.length) {
		return res.status(400).json({
			'errors': validationErrors
		});
	}
	req.body.email = validator.normalizeEmail(req.body.email, {gmail_remove_dots: false});

	const user = {
		userName: req.body.userName,
		email: req.body.email,
		password: req.body.password
	};

	usersHelpers.findUserByQuery({email: req.body.email}).then((existingUser) => {
		if (existingUser) {
			return res.status(409).json({
				'errors': {message: 'Account with that email address already exists.'}
			})
		}
		usersHelpers.createUser(user).then((user) => {
					req.login(user, {session: false}, (err) => {
						if (err) {
							return next(err);
						}
						res.status(200).json({message: 'user successfully signed in'});
					});
				}
		).catch((err) => {
			return next(err);
		});

	}).catch((err) => {
		return next(err);
	});

});


module.exports = router;
