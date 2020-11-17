const express = require('express');
const userHelpers = require('../helpers/users');

const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});

router.route('/user-details')
		.post(userHelpers.getUserDetails);

router.route('/add-quiz')
		.post(userHelpers.addQuizToUser);


module.exports = router;
