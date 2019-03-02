const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const icd10Controller = require('./icd10/icd10Controller');

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@icd-cluster-shard-00-00-ghdlz.gcp.mongodb.net:27017,icd-cluster-shard-00-01-ghdlz.gcp.mongodb.net:27017,icd-cluster-shard-00-02-ghdlz.gcp.mongodb.net:27017/${process.env.MONGO_DB}?ssl=true&replicaSet=icd-cluster-shard-0&authSource=admin&retryWrites=true`);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin. X-Requested-With, Content-Type, Accept, Authorization',
  );
  if (req.method === 'OPTIONS') {
    res.header(
      'Access-Control-Allow-Methods',
      'GET',
    );
  }
  next();
});

app.use('/icd10', icd10Controller);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
