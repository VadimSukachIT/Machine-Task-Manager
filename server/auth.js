const { secret, access } = require('config');
const jwt = require('jsonwebtoken');

exports.generateAuthToken = (user) => {
  let token = jwt.sign({ _id: user._id, access }, secret).toString();

  return token;
};
