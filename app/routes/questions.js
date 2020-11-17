const express = require('express');
const helpers = require('../helpers/questions');
const router = express.Router();

router.route('/')
		.get(helpers.getQuestions)
		.post(helpers.createQuestion);

router.route('/:id')
		.get(helpers.getQuestion)
		.put(helpers.updateQuestion)
		.delete(helpers.deleteQuestion);


module.exports = router;
