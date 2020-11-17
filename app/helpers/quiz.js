const db = require('../models');

// get all quiz quizzes
exports.getQuizzes = (req, res) => {
	db.Quiz.find().populate('questions').then((quizzes) => {
		res.status(200).json(quizzes)
	}).catch((error) => {
		res.status(500).json({"error": error})
	});
};

// get one quiz quiz
exports.getQuiz = (req, res) => {
	db.Quiz.findById(req.params.id).populate('questions').then(quiz => {
		res.status(200).json(quiz)
	}).catch(error => {
		res.status(500).json({"error": error})
	})
};

// create one quiz quiz
exports.createQuiz = async (req, res) => {
	const {title} = req.body;
	const {questions} = req.body;
	let questionsIds = [];
	if (questions && questions.length) {
		let i = 0;
		while (i < questions.length) {
			let question = questions[i];
			const savedQuestion = await createQuestion(question);
			questionsIds.push(savedQuestion._id);
			i++;
		}
		if (i === questions.length && questionsIds.length) {
			db.Quiz.create({
				title,
				questions: questionsIds
			}).then((createdQuiz) => {
				res.status(201).json(createdQuiz)
			}).catch(error => {
				res.status(500).json({"error": error})
			});
		}
	} else {
		res.status(500).json({"error": 'no questions found'})
	}
};

// update one quiz quiz
exports.updateQuiz = (req, res) => {
	db.Quiz.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
			.then(quiz => {
				res.status(200).json(quiz)
			}).catch(error => {
		res.status(500).json({"error": error})
	})
};

// delete one quiz quiz
exports.deleteQuiz = (req, res) => {
	db.Quiz.deleteOne({_id: req.params.id}).then(quiz => {
		res.send('deleted succefully')
	}).catch(error => {
		res.send(error)
	})
};


const createQuestion = function (question) {
	return db.Question.create(question).then(savedQuestion => {
		return savedQuestion;
	}).catch(err => {
		console.log('error creating  item ', item, ' error: ', e);
	});
};

module.exports = exports;
/*

findByIdAndUpdate(
		createdQuestion._id,
		{ $push: { comments: docComment._id } },
		{ new: true, useFindAndModify: false }
);*/
