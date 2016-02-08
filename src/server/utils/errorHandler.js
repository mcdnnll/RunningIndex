const logger = require('./logger').appLogger;
const errType = require('../utils/constants');

/**
 * Middleware to handle requests that contain errors
 * or result in a server-side error.
 */
module.exports = (err, req, res, next) => {

  logger.log('warn', err);

  switch (err.type) {
    case errType.INVALID_SECURITY_TOKEN:
      res.status(401).send({error: err.message});
      break;
    case errType.INVALID_INPUT:
      res.status(400).send({error: err.message});
      break;
    default:
      res.status(500).send({error: err.message});
  }
};
