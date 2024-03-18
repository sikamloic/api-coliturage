const userService = require('../services/user.service');
const authService = require('../services/auth.service')
const tokenService = require('../services/token.service');
const catchAsync = require('../utils/catchAsync');

const loginWithPhoneNumberAndPassword = catchAsync(async(req, res) =>{
    const user = await authService.loginWithPhoneNumberAndPassword(req.body);
    const tokens = await tokenService.generateAuthTokens(user);
    res.send({user, tokens});
});

const refreshAuth = catchAsync(async(req, res) =>{

});

const logout = catchAsync(async(req, res) =>{
    await authService.logout(req.body.refreshToken);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    loginWithPhoneNumberAndPassword,
    refreshAuth,
    logout
};