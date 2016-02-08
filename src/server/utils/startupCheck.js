const logger = require('./logger').appLogger;
const env = process.env;

/**
 * Function to perform startup check, ensuring that environment variables
 * have been correctly provided prior to initialising the server.
 */
module.exports = function startupCheck() {
  if (typeof env.NODE_ENV === 'undefined' ||
     (env.NODE_ENV !== 'production' && env.NODE_ENV !== 'development')) {
    const error = 'NODE_ENV must be set to "production" or "development" for correct operation';
    logger.log('fatal', error);
    throw new Error(error);
  }

  // Check to ensure security token has been set
  if (typeof env.SECURITY_TOKEN === 'undefined') {
    const error = 'SECURITY_TOKEN must be set for correct operation';
    logger.log('fatal', error);
    throw new Error(error);
  }
};
