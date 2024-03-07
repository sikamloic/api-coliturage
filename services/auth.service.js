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

module.exports = {
    loginWithPhoneNumberAndPassword,
    loginWithEmailAndPassword
};