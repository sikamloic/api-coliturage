const userService = require('../services/user.service');
const authService = require('../services/auth.service')
const tokenService = require('../services/token.service');
const catchAsync = require('../utils/catchAsync');

const loginWithPhoneNumberAndPassword = catchAsync(async(req, res) =>{
    const user = await authService.loginWithPhoneNumberAndPassword(req.body);
    const tokens = await tokenService.generateAuthTokens(user);
    res.send({user, tokens});
});

module.exports = {
    loginWithPhoneNumberAndPassword
};