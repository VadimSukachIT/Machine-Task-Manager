const mongoose = require('mongoose');
const { mongo } = require('config')

mongoose.Promise = global.Promise;
mongoose.connect(mongo);

module.exports = mongoose;
