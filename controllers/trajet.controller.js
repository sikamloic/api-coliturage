const trajetService = require('../services/trajet.service');
const emailService = require('../services/email.service');
const catchAsync = require('../utils/catchAsync');

const createTrajet = catchAsync(async(req, res) =>{
    const trajet = await trajetService.createTrajet(req.body);
    res.send(trajet);
});

const getTrajetById = catchAsync(async(req, res) =>{
    const trajet = await trajetService.createTrajet(req.params.id);
    res.send(trajet);
});

const getTrajetByStatut = catchAsync(async(req, res) =>{
    const trajet = await trajetService.createTrajet(req.query.statut);
    res.send(trajet);
});

const getTrajetByUserIdAndStatut = catchAsync(async(req, res) =>{
    const trajet = await trajetService.createTrajet(req.params.userId, req.query.statut);
    res.send(trajet);
});

const deleteTrajet = catchAsync(async(req, res) =>{
    const trajet = await trajetService.createTrajet(req.params.id);
    res.send(trajet);
});

module.exports = {
    createTrajet,
    deleteTrajet,
    getTrajetById,
    getTrajetByStatut,
    getTrajetByUserIdAndStatut
}