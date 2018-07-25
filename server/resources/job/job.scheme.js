const JobSchema = {
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
    enum: ['easy', 'normal', 'hard', 'impossible'],
    required: true
  },
  assignedAndroid: {
    type: {},
    default: {
      name: '',
      id: ''
    }
  }
};

module.exports = JobSchema;
