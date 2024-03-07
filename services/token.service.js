const jwt = require('jsonwebtoken');
const moment = require('moment');
const { Token } = require('../models');
const { tokenTypes } = require('../config/tokens');
const { Op } = require('sequelize');

const generateToken = (userId, expires, type, secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
}

const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  const tokenDoc = await Token.create({
    token,
    userId,
    expires,
    type,
    blacklisted,
  });
  return tokenDoc;
}

const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  const tokenDoc = await Token.findOne({ 
    where: {
      token,
      type,
      userId: payload.sub,
      blacklisted: false,
      expires: { [Op.gte]: moment().toDate() } // Vérifie également si le token est encore valide
    }
  });
  if (!tokenDoc) {
    throw new Error('Token not found or expired');
  }
  return tokenDoc;
}

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(process.env.ACCESS_TOKEN_EXPIRATION_MINUTES, 'minutes');
  const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS, process.env.JWT_SECRET);

  const refreshTokenExpires = moment().add(process.env.REFRESH_TOKEN_EXPIRATION_DAYS, 'days');
  const refreshToken = generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH, process.env.JWT_SECRET);
  await saveToken(refreshToken, user.id, refreshTokenExpires.toDate(), tokenTypes.REFRESH);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
}

module.exports = {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
};
