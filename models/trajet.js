const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./user');

const Trajet = sequelize.define('Trajet', {
    TrajetID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    LieuDepart: {
        type: DataTypes.STRING,
        allowNull: false
    },
    LieuArrivee: {
        type: DataTypes.STRING,
        allowNull: false
    },
    DateDepart: {
        type: DataTypes.DATE,
        allowNull: false
    },
    PlacesDisponibles: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

User.hasMany(Trajet, { foreignKey: 'TransporteurID' });
Trajet.belongsTo(User, { foreignKey: 'TransporteurID' });

module.exports = Trajet;
