const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
	title: String,
	questions: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Question"
		}
	],
}, {timestamps: true});

const Quiz = mongoose.model('Quiz', QuizSchema);
module.exports = Quiz;
