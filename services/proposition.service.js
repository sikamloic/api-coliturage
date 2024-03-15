const {Proposition} = require('../models');
const ApiError = require('../utils/apiError');
const httpStatus = require('http-status');
const trajetService = require('./trajet.service');
const colisService = require('./colis.service');

const createProposition = async(body) =>{
    try {
        const colis = await colisService.getColisById(body.colisId);
        const trajet = await trajetService.getTrajetById(body.trajetId);
        const user = colis.userId == trajet.userId;
        if(body.type == 'trajet'  && user) throw new ApiError(httpStatus.BAD_REQUEST, "Vous ne pouvez pas proposer votre trajet sur un colis vous appartenant !!!");
        if(body.type == 'colis'  && user) throw new ApiError(httpStatus.BAD_REQUEST, "Vous ne pouvez pas proposer votre colis sur un trajet vous appartenant !!!")
        const proposition = await Proposition.create(body);
        return proposition;
    }
    catch (err) {
        throw new ApiError(httpStatus.BAD_REQUEST, err)
    }
};

module.exports = {
    createProposition
}