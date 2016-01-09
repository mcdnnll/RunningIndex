const _ = require('lodash');
const http = require('http-status-codes');
const models = require('../models');
const logger = require('../utils/logger');
const csvToJS = require('../utils/csvToJS');
const dao = require('../dao');

/*====================================
=            GET '/Entries'          =
====================================*/

exports.getEntries = (req, res, next) => {
  logger.log('info', 'Retrieving running entries');
  models.Entry.findAll({attributes: ['id', 'date', 'runningIndex', 'location']})
    .then((entries) => res.status(http.OK).send(entries))
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

exports.loadDashboard = (req, res, next) => {

  // Retrieve dashboard data
  const runCountData = dao.getRunCountData();
  const bestRunData = dao.getBestRunData();

  Promise.all([runCountData, bestRunData])
    .then((runData) => {
      res.status(http.OK).send({runCount: runData[0], bestRun: runData[1]});
    })
    .catch((e) => next(e));
};
