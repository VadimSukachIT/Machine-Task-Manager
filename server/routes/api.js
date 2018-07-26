const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { authenticate } = require('mongo/middleware/authenticate');
const userController = require('resources/user/user.controller');
const androidController = require('resources/android/android.controller');
const jobController = require('resources/job/job.controller');

router.post('/user', userController.create);
router.post('/user/login', userController.login);
router.get('/user/all', userController.getAll);
router.get('/users/current', authenticate, userController.getCurrent);
router.put('/user/current/removeToken', authenticate, userController.deleteToken);

router.post('/android', androidController.create);
router.put('/android', androidController.update);
router.get('/android/all', androidController.getAll);
router.put('/android/:androidId/job/:jobId', androidController.assignTask);
router.delete('/android/:id', androidController.delete);

router.post('/job', jobController.create);
router.put('/job', jobController.update);
router.get('/job', jobController.getAll);
router.delete('/job/:id', jobController.delete);

module.exports = router;
