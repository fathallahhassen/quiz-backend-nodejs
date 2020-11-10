const mongoose = require("mongoose");

const databaseUrl = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.i3ozc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
mongoose.set('debug', true);
mongoose.connect(databaseUrl, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('database connected'))


// to make mongoose api promise friendly
mongoose.Promise = Promise;
module.exports.mongoose = mongoose
module.exports.Question = require('./question');
module.exports.User = require('./user');
