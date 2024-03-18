const {VehiculeService} = require('../services');
const catchAsync = require('../utils/catchAsync');

const addVehicule = catchAsync(async(req, res) =>{
    const vehicule = await VehiculeService.addVehicule(req.body);
    res.send(vehicule);
});

const getVehiculeById = catchAsync(async(req, res) =>{
    const vehicule = await VehiculeService.getVehiculeById(req.params.id);
    res.send(vehicule);
});

const getVehiculeByUserId = catchAsync(async(req, res) =>{
    const vehicule = await VehiculeService.getVehiculeByUserId(req.body);
    res.send(vehicule);
});

module.exports = {
    addVehicule,
    getVehiculeById,
    getVehiculeByUserId
}