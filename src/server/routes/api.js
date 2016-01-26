const _ = require('lodash');
const http = require('http-status-codes');
const models = require('../models');
const logger = require('../utils/logger');
const csvToJS = require('../utils/csvToJS');
const dao = require('../dao');

exports.getEntries = (req, res, next) => {
  logger.log('info', 'Retrieving running entries');

  dao.getAllEntries()
    .then((allEntries) => res.status(http.OK).send(allEntries))
    .catch((e) => next(e));
};

exports.createEntry = (req, res, next) => {
  logger.log('info', 'Storing new running entry');

  models.Entry.save()
    .then(() => res.status(http.OK).send())
    .catch((e) => next(e));
};

exports.uploadEntries = (req, res, next) => {

  // Convert csv file to JS objects
  const entryPath = '../../scripts/ri.txt';
  csvToJS(entryPath)
    .then((parsedEntries) => models.Entry.bulkCreate(parsedEntries))
    .then(() => res.status(http.OK).send())
    .catch((e) => next(e));
};

exports.getRunSummaries = (req, res, next) => {

  // Retrieve data summaries for dashboard
  const runCountData = dao.getRunCountData();
  const bestRunData = dao.getBestRunData();
  const lifetimeRunTotal = dao.getLifetimeTotalData();

  Promise.all([runCountData, bestRunData, lifetimeRunTotal])
    .then((runData) => {
      res.status(http.OK).send({
        runCount: runData[0],
        bestRun: runData[1],
        lifetimeTotal: runData[2],
      });
    })
    .catch((e) => next(e));
};
