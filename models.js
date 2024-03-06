const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Movie = sequelize.define('Movie', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  poster: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = { Movie };