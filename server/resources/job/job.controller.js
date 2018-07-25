const _ = require('lodash');
const { ObjectID } = require('mongodb');
const jobService = require('./job.service');

exports.getAll = async (req, res) => {
  const jobs = await jobService.find({});

  res.json({
    status: 200,
    data: jobs,
  });
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  const job = await jobService
    .findOneAndDelete({ _id: new ObjectID(id) });
  if (!job) {
    res.status(400).send();
    return;
  }
  res.send(job);
};

exports.create = async (req, res) => {
  const body = _.pick(req.body, ['name', 'description', 'complexityLevel']);

  const job = await jobService
    .create(body);

  if (!job) {
    res.status(400).send();
    return;
  }
  res.send(job);
};
