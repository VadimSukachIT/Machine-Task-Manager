const { secret, access } = require('config');
const jwt = require('jsonwebtoken');

module.generateAuthToken = (user) => {
  return jwt.sign({ _id: user._id, access }, secret).toString();

};
