const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
let lodash = require('lodash');
const {userModel} = require('../mongo/models/User');
let {authenticate} = require('../mongo/middleware/authenticate');
const {mongoose} = require('../mongo/mongoose');
const {AndroidModel} = require('../mongo/models/Android');
const {JobModel} = require('../mongo/models/Job');

const connection = (closure) => {
  return MongoClient.connect('mongodb://localhost:27017/androids', (err, client) => {
    if (err) return console.log(err);

    const db = client.db('androids');
    closure(db);
  })
};

const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};

let response = {
  status: 200,
  data: [],
  message: null
};

router.post('/users', (req, res) => {
  let body = lodash.pick(req.body, ['email', 'password']);
  let user = new userModel(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then(token => {
    res.header('x-auth', token).send(user);
  }).catch(err => {
    res.status(400).send(err.message);
  });
});

router.get('/users', (req, res) => {
  connection((db) => {
    db.collection('users')
      .find()
      .toArray()
      .then((users) => {
        response.data = users;
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});


router.post('/users/login', (req, res) => {
  let body = lodash.pick(req.body, ['email', 'password']);
  console.log(body.email, body.password);
  userModel.findByCredentials(body.email, body.password).then(user => {
    return user.generateAuthToken().then(token => {
      res.header('x-auth', token).send({user, token});
    });
  }).catch(err => {
    res.status(400).send();
  });

});
router.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

router.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  })
});

router.post('/androids', (req, res) => {
  let body = lodash.pick(req.body, ['name', 'avatarURL', 'complexityLevel']);
  let android = new AndroidModel(body);

  android.save().then(() => {
    res.send(android);
  }).catch(err => {
    res.status(400).send(err);
  });
});

router.get('/androids', (req, res) => {
  connection((db) => {
    db.collection('androids')
      .find()
      .toArray()
      .then((androids) => {
        response.data = androids;
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});

router.put('/android/assign', (req, res) => {
  let body = lodash.pick(req.body, ['androidId', 'jobId']);

  connection(async (db) => {
    const android = await db.collection('androids').findOne({_id: new ObjectID(body.androidId)});
    const queryBody = {assignedJob: body.jobId};
    if (android.reliability > 10) {
      queryBody.status = false;
    }
    const result = await db.collection('androids').update({_id: new ObjectID(body.androidId)}, {$set: queryBody});
    res.send(result);
  });
});

router.delete('/androids/android/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);

  connection(async (db) => {
    const result = await db.collection('androids').findOneAndDelete({_id: new ObjectID(id)}).catch(error => {
      res.status(400).send(error);
    });
    res.send(result);
  })
});


router.post('/jobs', (req, res) => {
  let body = lodash.pick(req.body, ['name', 'description', 'complexityLevel']);
  let android = new JobModel(body);

  android.save().then(() => {
    res.send(android);
  }).catch(err => {
    res.status(400).send(err);
  });
});

router.get('/jobs', (req, res) => {
  connection((db) => {
    db.collection('jobs')
      .find()
      .toArray()
      .then((jobs) => {
        response.data = jobs;
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});

router.delete('/jobs/job/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);

  connection(async (db) => {
    const result = await db.collection('jobs').findOneAndDelete({_id: new ObjectID(id)}).catch(error => {
      res.status(400).send(error);
    });
    res.send(result);
  })
});


module.exports = router;
