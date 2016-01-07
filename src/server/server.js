const config = require('config');
const express = require('express');
const cors = require('cors');
const logger = require('./utils/logger');

const models = require('./models');
const web = require('./routes/web');
const api = require('./routes/api');
const errorHandler = require('./utils/errorHandler');

const app = express();

// View engine init
app.set('views', config.dir.server + 'views');
app.set('view engine', 'jade');

// Set CORS to allow requests from webpack-dev-server
app.use(cors({
  origin: config.endpoints.webpack,
  credentials: true,
}));

// Server static content
app.use('/static', express.static('build/dist'));

// Switch bundle paths when using webpack-dev-server
// to allow proxying of the requests to real backendt
if (process.env.NODE_ENV === 'development') {
  app.set('staticPath', config.endpoints.static_dev);
} else {
  app.set('staticPath', config.endpoints.static);
}

// Init logging middleware
app.use((req, res, next) => {
  logger.log('info', 'HTTP %s %s', req.method, req.url);
  next();
});

// Web routes
app.get('/', web.index);

// API routes
app.get('/api/entries', api.getEntries);
app.post('/api/entries', api.createEntry);
app.post('/api/upload', api.uploadEntries);
app.get('/api/dashboard', api.loadDashboard);

// Error handling
app.use(errorHandler);

// Instantiate connection to db and start server
models.sequelize.sync().then((res, err) => {

  if (err) {
    logger.error(err);
  }

  app.listen(config.ports.web, 'localhost', () => {
    logger.log('info', 'Web Server running @ localhost:' + config.ports.web);
  });
});
