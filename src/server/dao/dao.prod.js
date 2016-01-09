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
  db.query(sql.getRunCountData, {model: db.Entries}).spread((results) => results)

    // Calculate run count totals relevant to current time period
    .then((dbData) => prd.calcRunCount(timePeriods, dbData))
    .then((runCountData) => {
      logger.log('info', 'getRunCountData(): Returning');
      return runCountData;
    })
    .catch((e) => e);
};

exports.getBestRunData = () => {
  logger.log('info', 'getBestRunData(): Starting exec');

  const db = models.sequelize;

  // TODO: Optimise sql queries
  const q1 = db.query(sql.getBestRunThisWeek, {model: db.Entries}).spread((results) => results);
  const q2 = db.query(sql.getBestRunLastWeek, {model: db.Entries}).spread((results) => results);
  const q3 = db.query(sql.getBestRunThisMonth, {model: db.Entries}).spread((results) => results);
  const q4 = db.query(sql.getBestRunLastMonth, {model: db.Entries}).spread((results) => results);
  const q5 = db.query(sql.getBestRunThisYear, {model: db.Entries}).spread((results) => results);
  const q6 = db.query(sql.getBestRunLastYear, {model: db.Entries}).spread((results) => results);

  return Promise.all([q1, q2, q3, q4, q5, q6]).then((dbData) => {

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
  .catch((e) => e);
};
