const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequilize');
const bcrypt = require('bcryptjs');
const { roles } = require('../config/roles');
const { Op } = require('sequelize');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  role: {
    type: DataTypes.STRING,
    validate: {
      isIn: [roles]
    }
  },
  ville: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  adresse: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

User.isNumberTaken = async function (telephone) {
  const user = await this.findOne({ where: { telephone: telephone } });
  // console.log(user)
  return user;
};

User.prototype.isPasswordMatch = async function (password) {
  return bcrypt.compare(password, this.password);
};

User.beforeSave(async (user, options) => {
  if (user.changed('password')) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  }
});

module.exports = User;