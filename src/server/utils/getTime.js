const moment = require('moment');

/**
 * Function to set current/relative time periods - used for aggregating data for dashboard
 * @return {Object} t - current time units
 */
module.exports = () => {

  const t = {};

  t.thisWeek = moment().isoWeek();
  t.lastWeek = moment().subtract(1, 'weeks').isoWeek();

  // Offset month to match postgres month
  t.thisMonth = moment().month() + 1;
  t.lastMonth = moment().subtract(1, 'month').month() + 1;

  t.thisYear = moment().year();
  t.lastYear = moment().subtract(1, 'year').year();

  return t;
};
