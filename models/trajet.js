const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequilize');
const User = require('./user');
const Vehicule = require('./vehicule')

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
        type: DataTypes.STRING,
        allowNull: true
    },
    statut: {
        type: DataTypes.ENUM('en attente', 'en cours', 'termine'),
        defaultValue: 'en attente'
    },
});

User.hasMany(Trajet, { foreignKey: 'userId' });
Trajet.belongsTo(User, { foreignKey: 'userId' });
Vehicule.hasMany(Trajet, { foreignKey: 'vehiculeId' });
Trajet.belongsTo(Vehicule, { foreignKey: 'vehiculeId' });

module.exports = Trajet;