const dotEnv = require('dotenv');
// ENV variables
dotEnv.config();

const db = require('../app/models');

const questionsData = [
	{
		question: "whats up",
		options: ['ok', 'not ok', 'top'],
		answer: 'done'
	}, {
		question: "whats up",
		options: ['ok', 'not ok', 'top'],
		answer: 'done'
	}, {
		question: "whats up",
		options: ['ok', 'not ok', 'top'],
		answer: 'done'
	}, {
		question: "whats up",
		options: ['ok', 'not ok', 'top'],
		answer: 'done'
	}, {
		question: "whats up",
		options: ['ok', 'not ok', 'top'],
		answer: 'done'
	}, {
		question: "whats up",
		options: ['ok', 'not ok', 'top'],
		answer: 'done'
	}, {
		question: "whats up",
		options: ['ok', 'not ok', 'top'],
		answer: 'done'
	},
];


var itemsProcessed = 0;


questionsData.forEach((item, index, array) => {
	db.Question.create({
		question: item.question,
		options: item.options,
		answer: item.answer
	}).then(a => {
		db.Question.findById(a, function (err, doc) {
			console.log('populated name "%s"', doc);
			itemsProcessed++;
			if (itemsProcessed === array.length) {
				console.log(" items Processed with value " + array.length);
				process.exit()
			}
		});
	}).catch(err => {
		return done(err)
	});

});


function done(err) {
	if (err) {
		console.error('err.stack', err.stack);
	}
}
