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

Proposition.beforeCreate(async (proposition, options) => {
    if (proposition.trajetId !== null && proposition.colisId !== null) {
        const trajet = await Trajet.findByPk(proposition.trajetId);
        const colis = await Colis.findByPk(proposition.colisId);
        
        if (!trajet || !colis) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Trajet ou colis introuvable');
        }

        if (trajet.userId === colis.userId) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Le userId du trajetId doit être différent du userId du colisId');
        }
        if (proposition.type === 'trajet') {
            if (trajet.date >= colis.date) {
                throw new ApiError(httpStatus.BAD_REQUEST, 'La date du trajetId doit être supérieure ou égale à la date du colisId');
            }
        }
        if (proposition.type === 'colis') {
            if (!trajet.tailleAutorisee.includes(colis.taille)) {
                throw new ApiError(httpStatus.BAD_REQUEST, 'La taille du colisId doit être autorisée par le trajetId');
            }
        }
    }
});

Trajet.hasMany(Proposition, { foreignKey: 'trajetId' });
Colis.hasMany(Proposition, { foreignKey: 'colisId' });
Proposition.belongsTo(Trajet, { foreignKey: 'trajetId' });
Proposition.belongsTo(Colis, { foreignKey: 'colisId' });

module.exports = Proposition;
