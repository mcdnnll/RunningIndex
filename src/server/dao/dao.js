const models = require('../models');
const logger = require('../utils/logger').appLogger;
const sql = require('../utils/preparedSql');
const getTime = require('../utils/getTime');
const prd = require('../utils/processRunData');


 /**
 * Function to retrieve run count data from the DB and calculate
 * run totals for the current time period.
 *
 * @return {Object}
 */
exports.getRunCountData = () => {

  logger.log('trace', 'getRunCountData(): Starting exec');
  const db = models.sequelize;

  // Get current time trace to calculate run data for the relative period
  const timePeriods = getTime();

  // Query DB for latest running count aggregates
  return db.query(sql.getRunCountData, {model: db.Entries}).spread((results) => results)

    // Calculate run count totals relevant to current time period
    .then((dbData) => prd.calcRunCount(timePeriods, dbData))
    .then((runCountData) => {
      logger.log('trace', 'getRunCountData(): Returning');
      return runCountData;
    })
    .catch((e) => {
      throw e;
    });
};


 /**
 * Function to retrieve best run indexes from the DB for the current and previous
 * time periods (weekly, monthly and yearly intervals).
 *
 * @return {Object}
 */
exports.getBestRunData = () => {

  logger.log('trace', 'getBestRunData(): Starting exec');
  const db = models.sequelize;

  // TODO: Optimise sql queries
  const q1 = db.query(sql.getBestRunThisWeek, {model: db.Entries}).spread((results) => results);
  const q2 = db.query(sql.getBestRunLastWeek, {model: db.Entries}).spread((results) => results);
  const q3 = db.query(sql.getBestRunThisMonth, {model: db.Entries}).spread((results) => results);
  const q4 = db.query(sql.getBestRunLastMonth, {model: db.Entries}).spread((results) => results);
  const q5 = db.query(sql.getBestRunThisYear, {model: db.Entries}).spread((results) => results);
  const q6 = db.query(sql.getBestRunLastYear, {model: db.Entries}).spread((results) => results);

  return Promise.all([q1, q2, q3, q4, q5, q6])
    .then((dbData) => {

      // Handle case where no run data is available for a certain time period
      // Set default to provide consistency on the client
      const defaultResult = {value: 0, date: 0};

      const bestRunSummary = {
        thisWeek: dbData[0][0] || defaultResult,
        lastWeek: dbData[1][0] || defaultResult,
        thisMonth: dbData[2][0] || defaultResult,
        lastMonth: dbData[3][0] || defaultResult,
        thisYear: dbData[4][0] || defaultResult,
        lastYear: dbData[5][0] || defaultResult,
      };

      logger.log('trace', 'getBestRunData(): Returning');
      return bestRunSummary;
    })
    .catch((e) => {
      throw e;
    });
};


 /**
 * Function to retrieve the total count of runs within the DB.
 *
 * @return {Integer}
 */
exports.getLifetimeTotalData = () => {

  logger.log('trace', 'getRunTotalData(): Starting exec');
  const db = models.sequelize;

  return models.Entry.findAll({attributes: [[db.fn('COUNT', db.col('runningIndex')), 'count']]})
    .then((dbData) => {
      logger.log('trace', 'getRunTotalData(): Returning');
      return parseInt(dbData[0].dataValues.count, 10);
    })
    .catch((e) => {
      throw e;
    });
};


 /**
 * Function to retrieve the complete dataset from the DB.
 *
 * @return {Array}
 */
exports.getAllEntries = () => {

  logger.log('trace', 'getAllEntries(): Starting exec');

  return models.Entry.findAll({
    attributes: ['id', 'date', 'runningIndex', 'location'],
    order: ['date'],
  }).then((dbData) => {
    logger.log('trace', 'getAllEntries(): returning');
    return dbData;
  })
  .catch((e) => {
    throw e;
  });
};


 /**
 * Function to retrieve the aggregate monthly running index average from the DB.
 *
 * @return {Array}
 */
exports.getAnnualMonthlyRIAvg = () => {

  logger.log('trace', 'getAnnualMonthlyAvg(): Starting exec');
  const db = models.sequelize;

  return db.query(sql.getAnnualMonthlyRIAverage, {model: db.Entries}).spread((results) => results)
    .then((dbData) => {
      logger.log('trace', 'getAnnualMonthlyAvg(): returning');
      return dbData;
    })
    .catch((e) => {
      throw e;
    });
};


 /**
 * Function to store a newly created running index entry.
 * @param: {Object} entry - contains validated date, running index and location
 *
 * @return {void}
 */
exports.storeEntry = (entry) => {

  logger.log('trace', 'storeEntry(): Starting exec');

  return models.Entry.create({
    date: entry.date,
    runningIndex: entry.runningIndex,
    location: entry.location,
  });
};


 /**
 * Function to retrieve the current month's running index average
 *
 * @return {Integer}
 */
exports.getCurrentMonthAverage = () => {

  logger.log('trace', 'getCurrentMonthAverage(): Starting exec');
  const db = models.sequelize;

  return db.query(sql.getThisMonthRIAverage, {model: db.Entries}).spread((results) => results)
    .then((dbData) => {
      logger.log('trace', 'getCurrentMonthAverage(): returning');
      // Unwrap object
      return dbData[0];
    })
    .catch((e) => {
      throw e;
    });
};
