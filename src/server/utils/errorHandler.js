const logger = require('./logger');

module.exports = (err, req, res) => {

  // TODO: Expand error handling based on status
  logger('error', err);
  res.status(500).send({err});
};
