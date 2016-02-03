const http = require('http-status-codes');
const models = require('../models');
const logger = require('../utils/logger');
const csvToJS = require('../utils/csvToJS');
const dao = require('../dao');
const errType = require('../utils/constants');

exports.getEntries = (req, res, next) => {
  logger.log('trace', 'getEntries(): Entered');

  dao.getAllEntries()
    .then((runData) => res.status(http.OK).send({dataset: runData}))
    .catch((e) => next(e));

  logger.log('trace', 'getEntries(): Returning');
};

exports.createEntry = (req, res, next) => {
  logger.log('trace', 'createEntry(): Entered');

  // Sanitize
  req.body.date = req.sanitize(req.body.date).trim();
  req.body.runningIndex = req.sanitize(req.body.runningIndex).trim();
  req.body.location = req.sanitize(req.body.location).trim();
  req.body.securityToken = req.sanitize(req.body.securityToken).trim();

  // Validate
  req.checkBody({
    date: {
      notEmpty: true,
      errorMessage: 'Error, No date provided',
    },
    runningIndex: {
      notEmpty: true,
      isInt: {
        options: [{min: 1, max: 100}],
        errorMessage: 'Running index must be between 1 and 100',
      },
      errorMessage: 'Error, No running index provided',
    },
    location: {
      optional: true,
    },
    securityToken: {
      notEmpty: true,
      errorMessage: 'Error, No security token provided',
    },
  });

  const validationErrors = req.validationErrors();

  // Short-ciruit request where incorrect security token is provided
  // or validation error were found
  if (req.body.securityToken !== process.env.SECURITY_TOKEN) {
    const err = {
      type: errType.INVALID_SECURITY_TOKEN,
      message: 'Provided security token is incorrect',
    };
    next(err);

  } else if (validationErrors) {
    logger.log('warn', 'createEntry(): Validation errors detected');
    logger.log('warn', validationErrors);

    const err = {
      type: errType.INVALID_INPUT,
      message: validationErrors,
    };

    next(err);

  } else {
    logger.log('trace', 'createEntry(): Validation & Security check succeeded');

    const entry = req.body;

    dao.storeEntry(entry)
      .then(() => res.status(http.CREATED).send())
      .catch((e) => next(e));
  }
  logger.log('trace', 'createEntry(): Returning');
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

  logger.log('trace', 'Retrieving run summaries');

  // Retrieve data summaries for dashboard
  const runCountData = dao.getRunCountData();
  const bestRunData = dao.getBestRunData();
  const lifetimeRunTotal = dao.getLifetimeTotalData();
  // const DayOfWeekSummary = dao.getDayOfWeekSummary();

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

exports.getGraphData = (req, res, next) => {

  logger.log('trace', 'Retrieving graph data');

  dao.getAnnualMonthlyRIAvg()
    .then((runData) => res.status(http.OK).send({monthlyAvg: runData}))
    .catch((e) => next(e));
};
