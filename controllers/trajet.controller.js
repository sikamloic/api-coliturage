const trajetService = require('../services/trajet.service');
const emailService = require('../services/email.service');
const catchAsync = require('../utils/catchAsync');

const createTrajet = catchAsync(async(req, res) =>{
    const {trajet, user} = await trajetService.createTrajet(req.body);
    // emailService.sendCreateColis(user.email, trajet);
    res.send(trajet);
});

const getTrajetById = catchAsync(async(req, res) =>{
    const trajet = await trajetService.getTrajetById(req.params.id);
    res.send(trajet);
});

const getTrajetByStatut = catchAsync(async(req, res) =>{
    const trajet = await trajetService.getTrajetByStatut(req.query.statut);
    res.send(trajet);
});

const getTrajetByUserIdAndStatut = catchAsync(async(req, res) =>{
    const trajet = await trajetService.getTrajetByUserIdAndStatut(req.params.userId, req.query.statut);
    res.send(trajet);
});

const deleteTrajet = catchAsync(async(req, res) =>{
    const trajet = await trajetService.deleteTrajet(req.params.id);
    res.send(trajet);
});

const getTrajetNotBelongingToUserId = catchAsync(async(req, res) =>{
    const colis = await trajetService.getTrajetNotBelongingToUserId(req.params.userId);
    res.send(colis);
})

module.exports = {
    createTrajet,
    deleteTrajet,
    getTrajetById,
    getTrajetByStatut,
    getTrajetByUserIdAndStatut,
    getTrajetNotBelongingToUserId
}