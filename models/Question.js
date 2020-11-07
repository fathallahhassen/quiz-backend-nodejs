const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
	description: String,
	choices: [
		{
			text: {
				type: String,
				required: 'name cannot be empty'
			},
			isCorrect: {
				type: Boolean,
				required: true,
				default: false
			}
		}
	]
}, { timestamps: true });

const Question = mongoose.model('Question', QuestionSchema);
module.exports = Question;
