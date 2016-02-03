const winston = require('winston');

const customColours = {
  trace: 'white',
  debug: 'blue',
  info: 'green',
  warn: 'yellow',
  critical: 'orange',
  fatal: 'red',
};

// Initialise logger
const logger = new winston.Logger({
  colors: customColours,
  levels: {
    trace: 0,
    debug: 1,
    info: 2,
    warn: 3,
    critical: 4,
    fatal: 5,
  },
  transports: [
    new (winston.transports.Console)({
      colorize: true,
      timestamp: true,
      level: 'fatal',
    }),
  ],
});

winston.addColors(customColours);

module.exports = logger;
