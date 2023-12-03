const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Hike = sequelize.define('Hike', {
    ID: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    HIKE_DATE: {
      type: DataTypes.DATE,
    },
    NAME: {
      type: DataTypes.STRING,
    },
    DISTANCE: {
      type: DataTypes.STRING,
    },
    LOCATION: {
      type: DataTypes.STRING,
    },
    WEATHER: {
      type: DataTypes.STRING,
    },
  });

Hike.sync({ force: false }).then(() => {
  console.log('Hike table synced');
});

module.exports = Hike;
