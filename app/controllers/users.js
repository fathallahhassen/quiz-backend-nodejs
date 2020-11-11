const db = require('../models');


// get one user user
exports.getUserById = (userId) => {
	return db.User.findById(userId)
};

// get one user user
exports.findUserByQuery = (query) => {
	return db.User.findOne(query)
};

// create one user user
exports.createUser = (user) => {
	const {userName, email, password} = user;
	return db.User.create({
		userName,
		email,
		password
	})
};


module.exports = exports;
