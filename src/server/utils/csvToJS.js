const fs = require('fs');
const path = require('path');
const logger = require('./logger');
const moment = require('moment');

/**
 * Helper function to convert a csv file into an array of JS objects
 * @param: {String} csvPath - relative path to csv file
 * @param: {Function} cb
 * @return {Array} entryObjArr - array of objects containing parsed csv entries
 */
module.exports = function csvToJS(csvPath, cb) {


  return new Promise((resolve, reject) => {

    fs.readFile(path.join(__dirname, csvPath), (err, data) => {

      if (err) {
        return reject(err);
      }

      // Create string from buffered data, split entries and remove blanks
      const bufferString = data.toString();
      let entryArr = bufferString.split('\n');
      entryArr = entryArr.filter((value) => value);

      const entryObjArr = [];
      const datePattern = /(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})/;
      const runningIndexPattern = /^\d{1,3}$/;

      // Build array of entry objects
      for (let i = 0; i < entryArr.length; i++) {

        // Split columns of each individual entry
        let entry = entryArr[i].split(',');

        // Remove leading and trailing whitespace
        entry = entry.map((column) => column.replace(/^\s+|\s+$/g, ''));

        // Each entry must contain 3 fields to be valid
        if (entry.length !== 3) {
          return reject(new Error('Not a valid csv file'));
        }

        const [entryDate, entryRunningIndex] = entry;

        console.log(entryDate);
        console.log(entryRunningIndex);

        // Entry must contain a date
        if (!entryDate) {
          return reject(new Error('Date column must not be blank'));
        }

        // Entry must contain a valid runningIndex
        if (!entryRunningIndex) {
          return reject(new Error('runningIndex column must not be blank'));
        } else if (!runningIndexPattern.test(entryRunningIndex)) {
          return reject(new Error('runningIndex must be an integer'));
        }

        // Entry date must be formatted correctly
        // if (!datePattern.test(entryDate)) {
        //   return reject(new Error('Incorrect date format found. Must be DD/MM/YYYY'));
        // }

        const obj = {};

        // Convert date format to create new Date()
        obj.date = moment(entryDate);

        obj.runningIndex = parseInt(entry[1], 10);
        obj.location = entry[2];

        entryObjArr.push(obj);
      }

      resolve(entryObjArr);
    });

  });
};
