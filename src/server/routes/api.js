const _ = require('lodash');
const http = require('http-status-codes');
const models = require('../models');
const logger = require('../utils/logger');
const csvToJS = require('../utils/csvToJS');
const dao = require('../dao');

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


exports.uploadEntries = (req, res, next) => {

  // Convert csv file to JS objects
  const entryPath = '../../scripts/ri.txt';
  csvToJS(entryPath).then((parsedEntries, parseErr) => {

    if (parseErr) {
      next(err);
    } else {

      // Save parsedEntries to db
      models.Entry.bulkCreate(parsedEntries)
        .then((success, dbErr) => {
          if (dbErr) {
            logger.error(dbErr);
          }
          res.status(200).send();
        });
    }


  });
};

exports.loadDashboard = (req, res, next) => {

  // Retrieve dashboard data
  const runCountData = dao.getRunCountData();
  const bestRunData = dao.getBestRunData();

  Promise.all([runCountData, bestRunData]).then((runData, err) => {
    if (err) {
      next(err);
    } else {
      res.status(200).send({runCount: runData[0], bestRun: runData[1]});
    }
  });
};
