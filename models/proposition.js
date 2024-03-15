const { DataTypes, Op} = require('sequelize');
const sequelize = require('../config/sequilize')
const Trajet = require('./trajet');
const Colis = require('./colis');
const ApiError = require('../utils/apiError')
const httpStatus = require('http-status')

const Proposition = sequelize.define('Proposition', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    prix: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    statut: {
        type: DataTypes.STRING,
        defaultValue: false
    },
    type: {
        type: DataTypes.ENUM('trajet', 'colis'),
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

Trajet.hasMany(Proposition, { foreignKey: 'trajetId' });
Colis.hasMany(Proposition, { foreignKey: 'colisId' });
Proposition.belongsTo(Trajet, { foreignKey: 'trajetId' });
Proposition.belongsTo(Colis, { foreignKey: 'colisId' });

module.exports = Proposition;
