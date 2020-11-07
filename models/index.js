const mongoose = require("mongoose");

mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/quiz-api', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('database connected'))

// to make mongoose api promise friendly
mongoose.Promise = Promise;

module.exports.Question = require('./Question');
module.exports.User = require('./User');
