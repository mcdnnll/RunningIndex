
module.exports = function(sequelize, DataTypes) {

  const Entry = sequelize.define('Entry', {
    date: DataTypes.DATE,
    runningIndex: DataTypes.INTEGER,
    location: DataTypes.STRING,
  });

  return Entry;
};
