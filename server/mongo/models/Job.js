let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let JobSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 16,
    trim: true,
    validate: {
      validator: function (name) {
        return /^[a-zA-Z]([\w -]*[a-zA-Z])?$/.test(name);
      },
      message: `Not valid name.`
    }
  },
  description: {
    type: String,
    maxlength: 255,
    default: 'No description'
  },
  complexityLevel: {
    type: String,
    enum: ['easy', 'normal', 'hard'],
    required: true
  }
});

let JobModel = mongoose.model('Jobs', JobSchema);

module.exports = {JobModel};
