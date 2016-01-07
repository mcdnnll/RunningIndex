const models = require('../models');
const sql = require('../utils/preparedSql');
const getTime = require('../utils/getTime');
const prd = require('../utils/processRunData');

exports.getRunCountData = () => {

  return new Promise((resolve, reject) => {

    const db = models.sequelize;

    const runCountData = db.query(sql.getRunCountData, {model: db.Entries}).spread((results) => results);

    runCountData.then((dbData, dbErr) => {
      if (dbErr) reject(dbErr);

      // Get current time periods to calculate relevant run count
      const timePeriods = getTime();

      prd.calcRunCount(timePeriods, dbData).then((rcRes, rcErr) => {
        if (rcErr) reject(rcErr);
        resolve(rcRes);
      });

    });
  });
};

exports.getBestRunData = () => {
  return new Promise((resolve, reject) => {

    const db = models.sequelize;

    // TODO: Optimise sql queries
    const q1 = db.query(sql.getBestRunThisWeek, {model: db.Entries}).spread((results) => results);
    const q2 = db.query(sql.getBestRunLastWeek, {model: db.Entries}).spread((results) => results);
    const q3 = db.query(sql.getBestRunThisMonth, {model: db.Entries}).spread((results) => results);
    const q4 = db.query(sql.getBestRunLastMonth, {model: db.Entries}).spread((results) => results);
    const q5 = db.query(sql.getBestRunThisYear, {model: db.Entries}).spread((results) => results);
    const q6 = db.query(sql.getBestRunLastYear, {model: db.Entries}).spread((results) => results);

    Promise.all([q1, q2, q3, q4, q5, q6]).then((dbData, dbErr) => {
      if (dbErr) reject(dbErr);

      const bestRunSummary = {
        thisWeek: dbData[0],
        lastWeek: dbData[1],
        thisMonth: dbData[2],
        lastMonth: dbData[3],
        thisYear: dbData[4],
        lastYear: dbData[5],
      };

      resolve(bestRunSummary);
    });
  });
};
