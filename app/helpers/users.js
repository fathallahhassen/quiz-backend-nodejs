const db = require('../models');


// get one user user
exports.getUserDetails = (req, res) => {
	this.findUserByQuery({email: req.body.email}).then(quiz => {
		res.status(200).json(quiz)
	}).catch(error => {
		res.status(500).json({"error": error})
	})
};


// get one user user
exports.getUserById = (userId) => {
	return db.User.findById(userId).populate('quizzes.quiz')
};

// get one user user
exports.findUserByQuery = (query) => {
	return db.User.findOne(query).populate('quizzes.quiz')
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


// update a user with a new quiz
exports.addQuizToUser = (req, res) => {
	db.User.findOneAndUpdate({email: req.body.email},
			{
				$push: {
					quizzes: {
						quiz: req.body.quiz.id,
						answers: req.body.quiz.answers,
						result: req.body.quiz.result,
					}
				}
			},
			{new: true, useFindAndModify: false}).then(question => {
				res.status(200).json(question)
			}).catch(error => {
		res.status(500).json({"error": error})
	})
};


module.exports = exports;
