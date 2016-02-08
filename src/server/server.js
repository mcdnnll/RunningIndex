const config = require('config');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const expressSanitizer = require('express-sanitizer');
const logger = require('./utils/logger').appLogger;
const models = require('./models');
const web = require('./routes/web');
const api = require('./routes/api');
const errorHandler = require('./utils/errorHandler');

const app = express();

logger.log('info', 'Starting webserver...');

app.set('views', config.dir.server + 'views');
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(expressSanitizer());

// Server static content
app.use('/static', express.static('build/dist'));

/**
 * Switch bundle paths when using webpack-dev-server
 * and configure cors to allow proxying of the
 * requests to real backend.
 */
if (process.env.NODE_ENV === 'production') {
  app.set('staticPath', config.endpoints.static);
  app.use(cors({
    origin: config.endpoints.web,
    credentials: true,
  }));
} else {
  app.set('staticPath', config.endpoints.static);
  app.use(cors({
    origin: config.endpoints.webpack,
    credentials: true,
  }));
}

// Initialise logging middleware
app.use((req, res, next) => {
  logger.log('info', '%s %s %s', req.ip, req.method, req.url);
  next();
});

// API routes
app.get('/api/entries', api.getEntries);
app.post('/api/entries', api.createEntry);
app.get('/api/dashboard/summary', api.getRunSummaries);
app.get('/api/dashboard/graph', api.getGraphData);

// Web routes
app.get('/', web.index);
app.get('/manage', web.index);

// Error handling middlware
app.use(errorHandler);

// Instantiate connection to db and start server
models.sequelize.sync().then((res, err) => {

  if (err) {
    logger.log('fatal', err);
    throw new Error(err);
  }

  app.listen(config.ports.web, 'localhost', () => {
    logger.log('info', 'Web Server running @ ' + config.endpoints.web + ' ' + config.ports.web);
  });
});
