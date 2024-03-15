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
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  poids: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  taille: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  depart: {
    type: DataTypes.STRING,
    allowNull: false
  },
  arrivee: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateLimite: {
    type: DataTypes.DATE,
    allowNull: true
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  statut: {
    type: DataTypes.ENUM('en attente', 'en cours', 'termine'),
    defaultValue: 'en attente'
  },
  photo: {
    type: DataTypes.BLOB,
    allowNull: true
  }
});

User.hasMany(Colis, { foreignKey: 'userId' });
Colis.belongsTo(User, { foreignKey: 'userId' });

module.exports = Colis;