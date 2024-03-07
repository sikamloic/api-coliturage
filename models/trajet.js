// trajets.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequilize');
const User = require('./user');

const Trajet = sequelize.define('Trajets', {
    trajetId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    transporteurId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    lieuDepart: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lieuArrivee: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateDepart: {
      type: DataTypes.DATE,
      allowNull: false
    },
    poidsDisponibles: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
});

module.exports = Trajet;