const _ = require('lodash');

/**
 * Function to aggregate run count statistics for main dashboard
 * @param: {Object} t - object containing time intervals for aggregation
 * @param: {Array} runCountData
 * @return {Object} runCount - data to be diplayed on the dashboard's run count card
 */
exports.calcRunCount = (t, runCountData) => {

  return new Promise((resolve, reject) => {

    const runCount = {
      thisWeek: 0,
      lastWeek: 0,
      thisMonth: 0,
      lastMonth: 0,
      thisYear: 0,
      lastYear: 0,
    };

    // Iterate through runCountData and aggregate runCount entries for current time periods
    for (let obj of runCountData) {

      // Aggregate annual run count
      if (obj.yr === t.thisYear) {
        runCount.thisYear += parseInt(obj.rcount, 10);
      } else {
        runCount.lastYear += parseInt(obj.rcount, 10);
      }

      // Aggregate monthly run count
      // Handle case where previous month falls in the previous year
      if (t.thisMonth === 1 && obj.mnth === t.lastMonth && obj.yr === t.lastYear) {
        runCount.lastMonth += parseInt(obj.rcount, 10);
      } else if (obj.mnth === t.lastMonth && obj.yr === t.thisYear) {
        runCount.lastMonth += parseInt(obj.rcount, 10);
      }

      if (obj.mnth === t.thisMonth && obj.yr === t.thisYear) {
        runCount.thisMonth += parseInt(obj.rcount, 10);
      }

      // Aggregate weekly run count
      // Handle cases where the year contains a leap week or where previous week is part of previous year
      if (t.thisWeek === 53 && obj.wk === t.lastWeek && obj.yr === t.lastYear) {
        runCount.lastWeek += parseInt(obj.rcount, 10);
      } else if (t.thisWeek === 1 && obj.wk === t.lastWeek && obj.yr === t.lastYear) {
        runCount.lastWeek += parseInt(obj.rcount, 10);
      } else if (obj.wk === t.lastWeek && obj.yr === t.thisYear) {
        runCount.lastWeek += parseInt(obj.rcount, 10);
      }

      if (obj.wk === t.thisWeek && obj.yr === t.thisYear) {
        runCount.thisWeek += parseInt(obj.rcount, 10);
      }
    }

    resolve(runCount);
  });
};
