const _ = require('lodash');
const models = require('../models');
const logger = require('../utils/logger');
const sql = require('../utils/preparedSql');
const getTime = require('../utils/getTime');
const prd = require('../utils/processRunData');

exports.getRunCountData = () => {

  logger.log('info', 'getRunCountData(): Starting exec');
  const db = models.sequelize;

  // Get current time info to calculate run data for the relative period
  const timePeriods = getTime();

  // Query DB for latest running count aggregates
  return db.query(sql.getRunCountData, {model: db.Entries}).spread((results) => results)

    // Calculate run count totals relevant to current time period
    .then((dbData) => prd.calcRunCount(timePeriods, dbData))
    .then((runCountData) => {
      logger.log('info', 'getRunCountData(): Returning');
      return runCountData;
    })
    .catch((e) => {
      throw e;
    });
};

exports.getBestRunData = () => {

  logger.log('info', 'getBestRunData(): Starting exec');
  const db = models.sequelize;

  // TODO: Optimise sql queries
  // Alternative: query on individual date fields and concatenate dates client side
  const q1 = db.query(sql.getBestRunThisWeek, {model: db.Entries}).spread((results) => results);
  const q2 = db.query(sql.getBestRunLastWeek, {model: db.Entries}).spread((results) => results);
  const q3 = db.query(sql.getBestRunThisMonth, {model: db.Entries}).spread((results) => results);
  const q4 = db.query(sql.getBestRunLastMonth, {model: db.Entries}).spread((results) => results);
  const q5 = db.query(sql.getBestRunThisYear, {model: db.Entries}).spread((results) => results);
  const q6 = db.query(sql.getBestRunLastYear, {model: db.Entries}).spread((results) => results);

  return Promise.all([q1, q2, q3, q4, q5, q6])
    .then((dbData) => {

      // Handle case where no run data is available for a certain time period
      // Allows for consistency on the client
      const defaultResult = {value: 0, date: 0};

      const bestRunSummary = {
        thisWeek: dbData[0][0] || defaultResult,
        lastWeek: dbData[1][0] || defaultResult,
        thisMonth: dbData[2][0] || defaultResult,
        lastMonth: dbData[3][0] || defaultResult,
        thisYear: dbData[4][0] || defaultResult,
        lastYear: dbData[5][0] || defaultResult,
      };

      logger.log('info', 'getBestRunData(): Returning');
      return bestRunSummary;
    })
    .catch((e) => {
      throw e;
    });
};

exports.getLifetimeTotalData = () => {

  logger.log('info', 'getRunTotalData(): Starting exec');
  const db = models.sequelize;

  return models.Entry.findAll({attributes: [[db.fn('COUNT', db.col('runningIndex')), 'count']]})
    .then((dbData) => {
      logger.log('info', 'getRunTotalData(): Returning');
      return parseInt(dbData[0].dataValues.count, 10);
    })
    .catch((e) => {
      throw e;
    });
};

exports.getAllEntries = () => {

  logger.log('info', 'getAllEntries(): Starting exec');

  return models.Entry.findAll({
    attributes: ['id', 'date', 'runningIndex', 'location'],
    order: ['date'],
  }).then((dbData) => {
    logger.log('info', 'getAllEntries(): returning');
    return dbData;
  })
  .catch((e) => {
    throw e;
  });
};

exports.getAnnualMonthlyRIAvg = () => {

  logger.log('info', 'getAnnualMonthlyAvg(): Starting exec');
  const db = models.sequelize;

  return db.query(sql.getAnnualMonthlyRIAverage, {model: db.Entries}).spread((results) => results)
    .then((dbData) => {
      logger.log('info', 'getAnnualMonthlyAvg(): returning');
      return dbData;
    })
    .catch((e) => {
      throw e;
    });
};

exports.storeEntry = (entry) => {

  logger.log('info', 'storeEntry(): Starting exec');

  // TODO: need to map the entry fields against the DB fields
  return models.Entry.create({
    date: entry.date,
    runningIndex: entry.runningIndex,
    location: entry.location,
  });
};
