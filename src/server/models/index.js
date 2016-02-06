const config = require('config');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const logger = require('../utils/logger').dbLogger;

const env = process.env.NODE_ENV || 'development';

// Initialise db connection for current environment
const dbConfig = (env === 'development') ? config.db[env] : require('../../../prod/dbProd')[env];

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
