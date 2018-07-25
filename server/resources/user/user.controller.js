const _ = require('lodash');
const { generateAuthToken } = require('auth')
const { access, secret } = require('config');
const userService = require('./user.service');

exports.create = async (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);
  const token = generateAuthToken(user);

  const user = await userService.create({
    ...body,
    tokens: { access, token },
  });
  res.header('x-auth', token).send(user);
};

exports.getAll = async (req, res) => {
  const users = await userService.find({});

  res.json({
    status: 200,
    data: users,
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.findOne({ email });
  if (!user) {
    res.status(400).send();
    return;
  }
  if (!bcrypt.compare(password, user.password)) {
    res.status(400).send();
    return;
  }
  const token = generateAuthToken(token);

  await userService.update({ _id: user._id }, {
    ...user,
    tokens: user.tokens.concat({ access, token }),
  });

  res.header('x-auth', token).send({ user, token });
};

exports.getCurrent = (req, res) => {
  res.send(req.user);
};

exports.deleteToken = async (req, res) => {
  console.log(req.url)
  const result = await req.user.removeToken(req.token);
  if (!result) {
    res.status(400).send();
  }
  res.status(200).send();
}

exports.findByToken = async (token) => {
  const decoded = jwt.verify(token, secret);
  if (!decoded) {
    return undefined;
  }
  return userService.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': access,
  })
}

