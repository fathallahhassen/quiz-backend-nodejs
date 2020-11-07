const db = require('../models');

// get all question questions
exports.getQuestions = (req, res) => {
	db.Question.find().then((questions) => {
		res.status(200).json(questions)
	}).catch((error) => {
		res.status(500).json({"error": error})
	});
};

// get one question question
exports.getQuestion = (req, res) => {
	db.Question.findById(req.params.id).then(question => {
		res.status(200).json(question)
	}).catch(error => {
		res.status(500).json({"error": error})
	})
};

// create one question question
exports.createQuestion = (req, res) => {
	const {description} = req.body;
	const {choices} = req.body;
	db.Question.create({
		description,
		choices
	}).then((createdQuestion) => {
		res.status(201).json(createdQuestion)
	}).catch(error => {
		res.status(500).json({"error": err})
	});
};

// update one question question
exports.updateQuestion = (req, res) => {
	db.Question.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
			.then(question => {
				res.status(200).json(question)
			}).catch(error => {
		res.status(500).json({"error": error})
	})
};

// delete one question question
exports.deleteQuestion = (req, res) => {
	db.Question.deleteOne({_id: req.params.id}).then(question => {
		res.send('deleted succefully')
	}).catch(error => {
		res.send(error)
	})
};

module.exports = exports;
