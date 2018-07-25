const mongoose = require('mongo/mongoose');
const validator = require('validator');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

const userSchema = require('./user.scheme');

// userSchema.pre('save', function (next) {
//   let user = this;

//   if (user.isModified('password')) {
//     bcrypt.genSalt(10, (err, salt) => {
//       bcrypt.hash(user.password, salt, (err, hash) => {
//         user.password = hash;
//         next();
//       });
//     });
//   } else {
//     next();
//   }
// });

// userSchema.methods.toJSON = function () {
//   let user = this;
//   let userObject = user.toObject();

//   return _.pick(userObject, ['_id', 'email']);
// };

// userSchema.methods.generateAuthToken = function () {
//   let user = this;
//   const access = 'auth';
//   let token = jwt.sign({_id: user._id, access}, '2257473Enigma').toString();

//   user.tokens = user.tokens.concat({access, token});

//   return user.save().then(() => {
//     return token;
//   });
// };

// userSchema.statics.findByToken = function (token) {
//   let User = this;
//   let decoded;

//   try {
//     decoded = jwt.verify(token, '2257473Enigma')
//   } catch (err) {
//     return Promise.reject('test');
//   }

//   return User.findOne({
//     '_id': decoded._id,
//     'tokens.token': token,
//     'tokens.access': 'auth'

//   })
// };

// userSchema.statics.findByCredentials = function (email, password) {
//   let User = this;

//   return User.findOne({email}).then(user => {
//     if (!user) {
//       return Promise.reject();
//     }
//     return new Promise((resolve, reject) => {
//       bcrypt.compare(password, user.password, (err, result) => {
//         if (result) {
//           resolve(user);
//         } else {
//           reject(err);
//         }
//       })
//     });
//   })
// };

// userSchema.methods.removeToken = function (token) {
//   let user = this;

//   return user.update({
//     $pull: {
//       tokens: {token}
//     }
//   });
// };

let userModel = mongoose.model('user', new Schema(userSchema));

module.exports = userModel;
