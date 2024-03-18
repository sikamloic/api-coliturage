const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequilize');
const User = require('./user');

const Vehicule = sequelize.define('Vehicule', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    marque: {
        type: DataTypes.STRING,
        allowNull: false
    },
    modele: {
        type: DataTypes.STRING,
        allowNull: false
    },
    annee: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    couleur: {
        type: DataTypes.STRING,
        allowNull: false
    },
    immatriculation: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
});

User.hasMany(Vehicule, { foreignKey: 'userId' });
Vehicule.belongsTo(User, { foreignKey: 'userId' });

module.exports = Vehicule;
