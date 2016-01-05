const _ = require('lodash');
const http = require('http-status-codes');
const models = require('../models');
const logger = require('../utils/logger');
const csvToJS = require('../utils/csvToJS');
const sql = require('../utils/preparedSql');
const prd = require('../utils/processRunData');
const getTime = require('../utils/getTime');

/*====================================
=            GET '/Entries'          =
====================================*/

exports.getEntries = (req, res) => {

  models.Entry.findAll({attributes: ['id', 'date', 'runningIndex', 'location']})
    .then((data, err) => {

      if (err) {
        logger.log('error', err);
      } else {
        res.status(200).send(data);
      }

    });
};

exports.createEntry = (req, res) => {

  models.Entry.save().then((result, err) => {

    if (err) {
      logger.log('error', err);
    }

    res.status(http.OK).send();
  });
};


exports.uploadEntries = (req, res) => {

  // Convert csv file to JS objects
  const entryPath = '../../scripts/ri.txt';
  csvToJS(entryPath).then((parsedEntries, parseErr) => {

    if (parseErr) {
      logger.log('error', parseErr);
    }

    // Save parsedEntries to db
    models.Entry.bulkCreate(parsedEntries)
      .then((success, dbErr) => {
        if (dbErr) {
          logger.error(dbErr);
        }
        res.status(200).send();
      });
  });
};

exports.loadDashboard = (req, res) => {

  const db = models.sequelize;

  // Retrieve dashboard data
  const q1 = db.query(sql.getRunCountData, {model: db.Entries}).spread((results) => results);
  const q2 = db.query(sql.getBestRunData, {model: db.Entries}).spread((results) => results);

  Promise.all([q1, q2]).then((dbData, dbErr) => {
    if (dbErr) {
      logger.error(dbErr);
    }

    const [runCountData, bestRunData] = dbData;

    // Get current time periods to process run data
    const timePeriods = getTime();
    const runCountSummary = prd.runCountSummary(timePeriods, runCountData);
    const bestRunSummary = prd.bestRunSummary(timePeriods, bestRunData);

    Promise.all([runCountSummary, bestRunSummary]).then((data, e) => {
      if (e) {
        logger.error(e);
      }

      res.status(200).send(data);
    });

  });

};
