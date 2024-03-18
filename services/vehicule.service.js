const {Vehicule} = require('../models');
const ApiError = require('../utils/apiError');
const httpStatus = require('http-status');
const userService = require('../services/user.service');

const addVehicule = async(body) =>{
    try {
        await userService.getUserById(body.userId)
        const vehicule = await Vehicule.create(body);
        return vehicule;
    } catch (err) {
        throw new ApiError(httpStatus.BAD_REQUEST, err);
    }
};

const getVehiculeById = async(id) =>{
    try {
        const vehicule = await Vehicule.findByPk(id);
        if(!vehicule) throw new ApiError(httpStatus.NOT_FOUND, "Aucun véhicule trouvé pour cet identifiant !!!");
        return vehicule;
    } catch (err) {
        throw new ApiError(httpStatus.BAD_REQUEST, err);
    }
};

const getVehiculeByUserId = async(userId) =>{
    try {
        const vehicule = await Vehicule.findAll({
            where: {userId: userId}
        });
        return vehicule;
    } catch (err) {
        throw new ApiError(httpStatus.BAD_REQUEST, err);
    }
}

module.exports = {
    addVehicule,
    getVehiculeById,
    getVehiculeByUserId
}