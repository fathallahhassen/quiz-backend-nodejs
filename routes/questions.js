const express = require('express');
const helpers = require('../helpers/questions');
const router = express.Router();

// this one is just a test
router.route('/test')
		.get((req, res) => {
			res.send('H3ll0 W0RlD')
		});

router.route('/')
		.get(helpers.getQuestions)
		.post(helpers.createQuestion);

router.route('/:id')
		.get(helpers.getQuestion)
		.put(helpers.updateQuestion)
		.delete(helpers.deleteQuestion);


module.exports = router;
