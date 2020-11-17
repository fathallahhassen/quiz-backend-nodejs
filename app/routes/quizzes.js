const express = require('express');
const quizHelpers = require('../helpers/quiz');
const router = express.Router();

router.route('/')
		.get(quizHelpers.getQuizzes)
		.post(quizHelpers.createQuiz);

router.route('/:id')
		.get(quizHelpers.getQuiz)
		.put(quizHelpers.updateQuiz)
		.delete(quizHelpers.deleteQuiz);


module.exports = router;
