const { User } = require('../models');
const ApiError = require('../utils/apiError');
const httpStatus = require('http-status');
const userService = require('./user.service');

const loginWithPhoneNumberAndPassword = async (body) => {
    console.log(body)
    const { telephone, password } = body;
    const user = await userService.getUserByPhoneNumber(telephone);
    if (!user || !(await user.isPasswordMatch(password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Numéro de téléphone ou mot de passe incorrect !!!');
    }
    return user;
};

const loginWithEmailAndPassword = async (body) => {
    console.log(body)
    const { email, password } = body;
    const user = await userService.getUserByEmail(email);
    if (!user || !(await user.isPasswordMatch(password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Email ou mot de passe incorrect !!!');
    }
    return user;
};

const refreshAuth = async (refreshToken) => {
    try {
      const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
      const user = await userService.getUserById(refreshTokenDoc.user);
      if (!user) {
        throw new Error();
      }
      await refreshTokenDoc;
      return tokenService.generateAuthTokens(user);
    } catch (error) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
    }
};

const logout = async (refreshToken) => {
    const refreshTokenDoc = await Token.findOne({
      where: {
        token: refreshToken,
        type: tokenTypes.REFRESH,
        blacklisted: false
      }
    });
    if (!refreshTokenDoc) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
    }
    await refreshTokenDoc.destroy();
  };

module.exports = {
    loginWithPhoneNumberAndPassword,
    loginWithEmailAndPassword,
    refreshAuth,
    logout
};