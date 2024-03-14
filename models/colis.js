// colis.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequilize');
const User = require('./user');

const Colis = sequelize.define('Colis', {
  ColisID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Poids: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  Dimensions: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  LieuDepart: {
    type: DataTypes.STRING,
    allowNull: false
  },
  LieuArrivee: {
    type: DataTypes.STRING,
    allowNull: false
  },
  DateLimiteLivraison: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  Status: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  }
});

User.hasMany(Colis, { foreignKey: 'UserID' });
Colis.belongsTo(User, { foreignKey: 'UserID' });

module.exports = Colis;