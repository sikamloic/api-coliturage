// colis.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequilize');
const User = require('./user');

const Colis = sequelize.define('Colis', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  poids: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  dimension: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.TEXT
  },
  lieuDepart: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lieuArrivee: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateLimiteLivraison: {
    type: DataTypes.DATE
  },
  Photos: {
    type: DataTypes.STRING // Utilisation d'un type JSONB pour stocker un tableau de photos
  },
  Statut: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false // Définir une valeur par défaut pour le statut
  }
});

module.exports = Colis;