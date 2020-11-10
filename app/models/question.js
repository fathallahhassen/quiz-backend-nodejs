const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
	question: String,
	options: [],
	answer: String
}, { timestamps: true });

const Question = mongoose.model('Question', QuestionSchema);
module.exports = Question;
