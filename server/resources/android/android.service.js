const mongoose = require('mongo/mongoose');
const Schema = mongoose.Schema;
const AndroidSchema = require('./android.scheme');

let AndroidModel = mongoose.model('android', new Schema(AndroidSchema));

module.exports = AndroidModel;
