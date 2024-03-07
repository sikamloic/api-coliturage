const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequilize');

const Token = sequelize.define('Token', {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('REFRESH', 'RESET_PASSWORD'),
    allowNull: false,
  },
  expires: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  blacklisted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, 
{
  timestamps: true,
});

// sequelize.queryInterface.addIndex('tokens', ['expires'], {
//   expireAfterSeconds: 0
// });

module.exports = Token;