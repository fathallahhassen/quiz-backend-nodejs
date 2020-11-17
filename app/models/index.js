const mongoose = require("mongoose");
let databaseUrl = 'mongodb://localhost/quiz-api';
if (process.env.NODE_ENV === 'prod') {
	databaseUrl = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.i3ozc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
}
mongoose.set('debug', true);
mongoose.connect(databaseUrl, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('database connected'));


// to make mongoose api promise friendly
mongoose.Promise = Promise;
module.exports = {
	Db: db,
	Question: require('./question'),
	User: require('./user'),
	Quiz: require('./quiz'),
};
