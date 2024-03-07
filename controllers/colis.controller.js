const colisService = require('../services/colis.service');
const catchAsync = require('../utils/catchAsync');

const createColis = catchAsync(async(req, res) =>{
  const colis = await colisService.createColis(req.body);
  res.send(colis);
});

const deleteColis = catchAsync(async(req, res) =>{
  const colis = await colisService.deleteColisById(req.params.id);
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

module.exports = {
  createColis,
  deleteColis,
  getAllColis,
  getColisById
}