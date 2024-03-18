const serachService = require('../services/search.service');
const catchAsync = require('../utils/catchAsync')

const searchDepartArriveeDate = catchAsync(async(req, res) =>{
  const result = await serachService.searchDepartArriveeDate(req.query);
  res.send(result);
});

const actualite = catchAsync(async(req, res) =>{
  const result = await serachService.actualite();
  res.send(result);
});

module.exports = {
  searchDepartArriveeDate,
  actualite
}