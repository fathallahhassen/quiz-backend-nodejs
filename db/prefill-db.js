const dotEnv = require('dotenv');
// ENV variables
dotEnv.config();

const QuizDb = require('../app/models');

QuizDb.Db.dropCollection("questions", function (
		err,
		result
) {
	console.log("Collection droped");
});
const questionsData = [
	{
		question: "What color is the sky ?",
		options: ['Blue', 'Red', 'Pink', 'Green'],
		answer: 'Blue'
	}, {
		question: "What color is the grass ?",
		options: ["Black", "Green", "Yellow", "Purple"],
		answer: 'Green'
	}, {
		question: "What color is the sea ?",
		options: ['Purple', 'Blue', 'Red', 'Pink'],
		answer: 'Blue'
	}, {
		question: "What color is the dirt ?",
		options: ['Brown', 'Pink', 'Purple', 'Blue', 'Red'],
		answer: 'Brown'
	}, {
		question: "What color is the sun ?",
		options: ["Yellow", "Turqouise", "Orange", "Brown"],
		answer: 'Yellow'
	}, {
		question: "What color is the moon ?",
		options: ["Brown", "white", "Turqouise", "Orange"],
		answer: 'white'
	}, {
		question: "What color is the brain ?",
		options: ["Grey", "Brown", "white", "Turqouise"],
		answer: 'Grey'
	}, {
		question: "What color is the volcano ?",
		options: ["Brown", "Lava", "white", "Turqouise"],
		answer: 'Lava'
	}, {
		question: "What color is the inner core ?",
		options: ["Brown", "Lava", "Yellow", "Turqouise"],
		answer: 'Yellow'
	}, {
		question: "What color is the liver ?",
		options: ["Yellow", "Brown", "Lava", "white"],
		answer: 'Brown'
	},
];


var itemsProcessed = 0;


questionsData.forEach((item, index, array) => {
	QuizDb.Question.create({
		question: item.question,
		options: item.options,
		answer: item.answer
	}).then(a => {
		QuizDb.Question.findById(a, function (err, doc) {
			itemsProcessed++;
			if (itemsProcessed === array.length) {
				console.log('%s items processed of %s items in total', itemsProcessed, array.length);
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
