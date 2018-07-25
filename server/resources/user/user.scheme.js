const validator = require('validator');

const UserSchema = {
  email: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: `Not valid email.`
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
};

module.exports = UserSchema;
