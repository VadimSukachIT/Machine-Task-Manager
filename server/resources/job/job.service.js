const mongoose = require('mongo/mongoose');
const Schema = mongoose.Schema;
const JobSchema = require('./job.scheme');

const JobModel = mongoose.model('job', new Schema(JobSchema));

module.exports = JobModel;
