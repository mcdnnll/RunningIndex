const config = require('config');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const logger = require('../utils/logger').dbLogger;

// Startup check to ensure env variables have been configured
require('../utils/startupCheck')();
const env = process.env.NODE_ENV;

/**
 * Initialise db connection for current environment
 * When running in production provide path to private DB configuration settings if not using
 * node-config. If using node-config lib, provide settings in config/production.json and
 * comment out the following line.
 */
const dbConfig = (env === 'development') ? config.db[env] : require('../../../prod/dbProd')[env];

// Uncomment line below if using node-config
// const dbConfig = config.db[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  logging: logger.info,
  timezone: dbConfig.timezone,
});

const db = {};

// Identify and configure all db models in current dir
fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0 ) && (file !== 'index.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
