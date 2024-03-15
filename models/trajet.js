const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequilize');
const User = require('./user');

const Trajet = sequelize.define('Trajet', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    depart: {
        type: DataTypes.STRING,
        allowNull: false
    },
    arrivee: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    poidsAutorise: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    tailleAutorisee: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    statut: {
        type: DataTypes.ENUM('en attente', 'en cours', 'termine'),
        defaultValue: 'en attente'
    },
});

User.hasMany(Trajet, { foreignKey: 'userId' });
Trajet.belongsTo(User, { foreignKey: 'userId' });

module.exports = Trajet;