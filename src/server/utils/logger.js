const winston = require('winston');

const customColours = {
  trace: 'white',
  debug: 'green',
  info: 'green',
  warn: 'yellow',
  crit: 'red',
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
    crit: 4,
    fatal: 5,
  },
  transports: [
    new (winston.transports.Console)({
      colorize: true,
      timestamp: true,
    }),
  ],
});

winston.addColors(customColours);

export default logger;
