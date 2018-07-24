let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AndroidSchema = new Schema({
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
  avatar: {
    type: String,
    required: true,
    default: 'https://i.ytimg.com/vi/IsTt9eT6snA/maxresdefault.jpg',
  },
  reliability: {
    type: Number,
    default: 10,
    required: true
  },
  status: {
    type: Boolean,
    default: true,
    required: true
  },
  skills: {
    type: [String]
  },
  assignedJob: {
    type: String,
    default: 'Without a  job'
  },
});

AndroidSchema.statics.assignForJob = function (android, androidId, jobID) {
  console.log(android);
   android.update({
     $set: {
       "assignedJob": jobID
     }
   })
};

let AndroidModel = mongoose.model('Androids', AndroidSchema);

module.exports = {AndroidModel};
