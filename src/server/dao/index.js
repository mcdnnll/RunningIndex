
if (process.env.NODE_ENV === 'production' || process.env.DEV_DB) {
  module.exports = require('./dao.prod');
} else {
  module.exports = require('./dao.dev');
}
