const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Trajet = require('./trajets');
const Colis = require('./colis');

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
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('trajet', 'colis'),
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    validate: {
        async checkUserId() {
            if (this.type === 'trajet') {
                const trajet = await Trajet.findByPk(this.trajetId);
                if (trajet && trajet.userId === this.userId) {
                    throw new Error('Le trajet ne peut pas appartenir au même utilisateur que la proposition.');
                }
            } else if (this.type === 'colis') {
                const colis = await Colis.findByPk(this.colisId);
                if (colis && colis.userId === this.userId) {
                    throw new Error('Le colis ne peut pas appartenir au même utilisateur que la proposition.');
                }
            }
        },
        async checkDuplicate() {
            const existingProposition = await Proposition.findOne({
                where: {
                    [sequelize.Op.or]: [
                        { type: this.type, trajetId: this.trajetId },
                        { type: this.type, colisId: this.colisId }
                    ]
                }
            });
            if (existingProposition) {
                throw new Error('Cette proposition existe déjà.');
            }
        }
    }
});

Trajet.hasMany(Proposition, { foreignKey: 'trajetId' });
Colis.hasMany(Proposition, { foreignKey: 'colisId' });
Proposition.belongsTo(Trajet, { foreignKey: 'trajetId' });
Proposition.belongsTo(Colis, { foreignKey: 'colisId' });

module.exports = Proposition;
