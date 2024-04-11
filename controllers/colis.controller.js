const colisService = require('../services/colis.service');
const emailService = require('../services/email.service');
const catchAsync = require('../utils/catchAsync');

const createColis = catchAsync(async(req, res) =>{
  const {colis, user} = await colisService.createColis(req.body);
  emailService.sendCreateColis(user.email, colis);
  res.send(colis);
});

const deleteColis = catchAsync(async(req, res) =>{
  const colis = await colisService.deleteColis(req.params.id);
  res.send(colis);
});

const getAllColis = catchAsync(async(req, res) =>{
  const colis = await colisService.getAllColis();
  res.send(colis);
});

const getColisById = catchAsync(async(req, res) =>{
  const colis = await colisService.getColisById(req.params.id);
  res.send(colis);
});

const getColisByStatut = catchAsync(async(req, res) =>{
  const colis = await colisService.getColisByStatut(req.query.statut);
  res.send(colis);
});

const getColisByUserIdAndStatut = catchAsync(async(req, res) =>{
  const colis = await colisService.getColisByUserIdAndStatut(req.params.userId, req.query.statut);
  res.send(colis)
});

const getColisNotBelongingToUserId = catchAsync(async(req, res) =>{
  const colis = await colisService.getColisNotBelongingToUserId(req.params.userId);
  res.send(colis);
});

module.exports = {
  createColis,
  deleteColis,
  getAllColis,
  getColisById,
  getColisByStatut,
  getColisByUserIdAndStatut,
  getColisNotBelongingToUserId
}