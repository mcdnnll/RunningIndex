const logger = require('./logger');

module.exports = (err, req, res, next) => {

  // TODO: Expand error handling based on status
  logger.log('error', err);
  res.status(500).send({err});
};
