const _ = require('lodash');
const {ObjectID} = require('mongodb');
const androidService = require('./android.service');

exports.getAll = async (req, res) => {
  const androids = await androidService.find({});
  console.log(androids);

  res.json({
    status: 200,
    data: androids,
  });
};

exports.assignTask = async (req, res) => {
  const {androidId, jobId} = req.params;


  const android = await androidService
    .findOne({_id: new ObjectID(androidId)});

  const queryBody = {assignedJob: jobId};

  android.reliability--;
  queryBody.reliability = android.reliability;

  if (android.reliability === 0) {
    queryBody.status = false;
  }

  const result = await androidService
    .update({_id: new ObjectID(androidId)}, {$set: queryBody});
  res.send(result);
};

exports.delete = async (req, res) => {
  const {id} = req.params;
  console.log(id);

  const android = await androidService
    .findOneAndDelete({_id: new ObjectID(id)});
  if (!android) {
    res.status(400).send();
    return;
  }
  res.send(android);
};

exports.create = async (req, res) => {
  const body = _.pick(req.body, ['name', 'avatarURL', 'skills', 'assignedJob']);

  const android = await androidService
    .create(body);
  if (!android) {
    res.status(400).send();
    return;
  }
  res.send(android);
};

exports.update = async (req, res) => {
  const android = req.body;

  const queryBody = {name: android.name, skills: android.skills};
  const result = await androidService
    .update({_id: new ObjectID(android._id)}, {$set: queryBody});
  res.send(result);
};
