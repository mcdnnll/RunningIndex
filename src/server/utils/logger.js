const winston = require('winston');

const customColours = {
  trace: 'white',
  debug: 'blue',
  info: 'green',
  warn: 'yellow',
  critical: 'orange',
  fatal: 'red',
};

const loggerConfig = {
  colors: customColours,
  levels: {
    trace: 5,
    debug: 4,
    info: 3,
    warn: 2,
    critical: 1,
    fatal: 0,
  },
};

// Initialise loggers
const appLogger = new winston.Logger(loggerConfig);
const dbLogger = new winston.Logger(loggerConfig);

if (process.env.NODE_ENV === 'production') {

  // Add application loggers
  appLogger.add(winston.transports.File, {
    name: 'appInfo-file',
    filename: 'logs/appLog-info.log',
    timestamp: true,
    level: 'trace',
  });
  appLogger.add(winston.transports.File, {
    name: 'appError-file',
    filename: 'logs/appLog-error.log',
    timestamp: true,
    level: 'warn',
  });

  // Add db loggers
  dbLogger.add(winston.transports.File, {
    name: 'dbInfo-file',
    filename: 'logs/dbLog-info.log',
    colorize: true,
    timestamp: true,
    level: 'trace',
  });
  dbLogger.add(winston.transports.File, {
    name: 'dbError-file',
    filename: 'logs/dbLog-error.log',
    colorize: true,
    timestamp: true,
    level: 'warn',
  });

} else {
  appLogger.add(winston.transports.Console)({
    colorize: true,
    timestamp: true,
    level: 'info',
  });

  dbLogger.add(winston.transports.Console)({
    colorize: true,
    timestamp: true,
    level: 'info',
  });
}

module.exports = {
  appLogger,
  dbLogger,
};
