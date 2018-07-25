const { secret, access } = require('config');

module.generateAuthToken = (user) => {
  let token = jwt.sign({ _id: user._id, access }, secret).toString();

  return token;
};