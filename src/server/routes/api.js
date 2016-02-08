const http = require('http-status-codes');
const logger = require('../utils/logger').appLogger;
const dao = require('../dao/dao');
const errType = require('../utils/constants');


 /**
 * GET /api/entries
 * Retrieve complete dataset.
 *
 * @return {array} of entry objects on success
 */
exports.getEntries = (req, res, next) => {
  logger.log('trace', 'getEntries(): Entered');

  dao.getAllEntries()
    .then((runData) => res.status(http.OK).send({dataset: runData}))
    .catch((e) => next(e));

  logger.log('trace', 'getEntries(): Returning');
};


/**
 * POST /api/entries
 * Creates and stores a new running index entry.
 *
 * Perform sanitisation and validation of inputs prior to
 * storing in DB. Expects that the request body will contain:
 * @param: {String} date - ISO date string for the entry
 * @param: {Integer} runningIndex - value between 1 and 100
 * @param: {String} securityToken - required to authorise entry, must match local env.
 * @param: {String} location [optional]
 *
 * @return {void} a 201 status is sent to the client on success
 */
exports.createEntry = (req, res, next) => {
  logger.log('trace', 'createEntry(): Entered');

  // Sanitize user input
  req.body.date = req.sanitize(req.body.date).trim();
  req.body.runningIndex = req.sanitize(req.body.runningIndex).trim();
  req.body.securityToken = req.sanitize(req.body.securityToken).trim();

  // Location is an optional parameter, only sanitize if it has a value
  if (typeof req.body.location !== 'undefined' && req.body.location) {
    req.body.location = req.sanitize(req.body.location).trim();
  }

  // Validate user inputs
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

  // Collect any errors from the validation process
  const validationErrors = req.validationErrors();

  // Short-circuit request where incorrect security token is provided
  // or validation errors were found
  if (req.body.securityToken !== process.env.SECURITY_TOKEN) {
    const err = {
      type: errType.INVALID_SECURITY_TOKEN,
      message: 'Sorry, the security token is incorrect',
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

    // Store entry once it has been validated
    const entry = req.body;
    dao.storeEntry(entry)
      .then(() => res.status(http.CREATED).send())
      .catch((e) => next(e));
  }
  logger.log('trace', 'createEntry(): Returning');
};


 /**
 * GET /api/dashboard/summary
 * Retrieves data used for populating the dashboard's summary card components
 *
 * @return {Object}
 */
exports.getRunSummaries = (req, res, next) => {

  logger.log('trace', 'Retrieving run summaries');

  // Retrieve data summaries for dashboard
  const runCountData = dao.getRunCountData();
  const bestRunData = dao.getBestRunData();
  const lifetimeRunTotal = dao.getLifetimeTotalData();
  const currentMonthAverage = dao.getCurrentMonthAverage();

  // Wait for all DB calls to return before sending response to client
  Promise.all([runCountData, bestRunData, lifetimeRunTotal, currentMonthAverage])
    .then((runData) => {
      res.status(http.OK).send({
        runCount: runData[0],
        bestRun: runData[1],
        lifetimeTotal: runData[2],
        currentMonthAvg: runData[3],
      });
    })
    .catch((e) => next(e));
};


 /**
 * GET /api/dashboard/graph
 * Retrieves data used for populating the dashboard's average bar chart
 *
 * @return {Object}
 */
exports.getGraphData = (req, res, next) => {

  logger.log('trace', 'Retrieving graph data');

  dao.getAnnualMonthlyRIAvg()
    .then((runData) => res.status(http.OK).send({monthlyAvg: runData}))
    .catch((e) => next(e));
};
