const _ = require('lodash');
const { ObjectID } = require('mongodb');
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
  const { androidId, jobId } = req.body;

  const android = await androidService
    .findOne({ _id: new ObjectID(androidId) });
  const queryBody = { assignedJob: jobId };
  if (android.reliability > 10) {
    queryBody.status = false;
  }
  const result = await androidService
    .update({ _id: new ObjectID(androidId) }, { $set: queryBody });
  res.send(result);
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const android = await androidService
    .findOneAndDelete({ _id: new ObjectID(id) });
  if (!android) {
    res.status(400).send();
    return;
  }
  res.send(android);
};

exports.create = async (req, res) => {
  console.log(req.body);
  const body = _.pick(req.body, ['name', 'avatarURL', 'skills', 'assignedJob']);
  console.log('BOdy:', body);

  const android = await androidService
    .create(body);
  if (!android) {
    res.status(400).send();
    return;
  }
  res.send(android);
};
