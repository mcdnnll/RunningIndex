const models = require('../models');
const logger = require('../utils/logger');
const csvToJS = require('../utils/csvToJS');
const http = require('http-status-codes');

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
  csvToJS(entryPath, (result) => {
    models.Entry.bulkCreate(result).then((success, err) => {
      if (err) {
        logger.error(err);
      }
      res.status(200).send();
    });
  });
};
