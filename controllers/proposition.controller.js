const propositionService = require('../services/proposition.service');
const emailService = require('../services/email.service');
const catchAsync = require('../utils/catchAsync');

const createProposition = catchAsync(async(req, res) =>{
    const proposition = await propositionService.createProposition(req.body);
    res.send(proposition);
});

module.exports = {
    createProposition
}