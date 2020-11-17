const dotEnv = require('dotenv');
// ENV variables
dotEnv.config();

const QuizDb = require('../app/models');

QuizDb.Db.dropCollection("quizzes", function (
		err,
		result
) {
	if (err) {
		console.log("err", err);
	}
	console.log("Collection droped");
});


const quizData = {
	title: "color quiz",
	questions: [
		{
			"question": "What color is the sky ?",
			"options": ["Blue", "Red", "Pink", "Green"],
			"answer": "Blue"
		}, {
			"question": "What color is the grass ?",
			"options": ["Black", "Green", "Yellow", "Purple"],
			"answer": "Green"
		}, {
			"question": "What color is the sea ?",
			"options": ["Purple", "Blue", "Red", "Pink"],
			"answer": "Blue"
		}, {
			"question": "What color is the dirt ?",
			"options": ["Brown", "Pink", "Purple", "Blue", "Red"],
			"answer": "Brown"
		}, {
			"question": "What color is the sun ?",
			"options": ["Yellow", "Turqouise", "Orange", "Brown"],
			"answer": "Yellow"
		}, {
			"question": "What color is the moon ?",
			"options": ["Brown", "white", "Turqouise", "Orange"],
			"answer": "white"
		}, {
			"question": "What color is the brain ?",
			"options": ["Grey", "Brown", "white", "Turqouise"],
			"answer": "Grey"
		}, {
			"question": "What color is the volcano ?",
			"options": ["Brown", "Lava", "white", "Turqouise"],
			"answer": "Lava"
		}, {
			"question": "What color is the inner core ?",
			"options": ["Brown", "Lava", "Yellow", "Turqouise"],
			"answer": "Yellow"
		}, {
			"question": "What color is the liver ?",
			"options": ["Yellow", "Brown", "Lava", "white"],
			"answer": "Brown"
		}
	]
};

let questionsIds = [];

async function seedQuiz() {
	let i = 0;
	while (i < quizData.questions.length) {
		let question = quizData.questions[i];
		const savedQuestion = await createQuestion(question);
		questionsIds.push(savedQuestion._id);
		i++;
	}
	if (i === quizData.questions.length && questionsIds.length) {
		QuizDb.Quiz.create({
			title: quizData.title,
			questions: questionsIds
		}).then((createdQuiz) => {
			console.log('%s items processed of %s items in total', i, questionsIds.length, createdQuiz);
			process.exit()
		}).catch(error => {
			console.log("error", error);
		});
	}
}


const createQuestion = function (tutorial) {
	return QuizDb.Question.create(tutorial).then(docTutorial => {
		return docTutorial;
	}).catch(err => {
		console.log('error creating  item ', item, ' error: ', e);
	});
};

seedQuiz();
