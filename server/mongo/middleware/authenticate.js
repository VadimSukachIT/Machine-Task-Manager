const userController = require('resources/user/user.controller');

let authenticate = async (req, res, next) => {
  let token = req.header('x-auth');

  const user = await userController.findByToken(token);
  if (!user) {
    req.status(401).send();
    return;
  }

  req.user = user;
  req.token = token;
  next();
};

module.exports = {
  authenticate,
};
