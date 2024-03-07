const {Colis} = require('../models');
const ApiError = require('../utils/apiError');
const httpStatus = require('http-status');

const getColisById = async(id) =>{
  const colis = await Colis.findByPk(id);
  if(!colis) throw new  ApiError(httpStatus.NOT_FOUND, 'Id du colis  introuvable !!!');
  return colis;
};

const createColis = async(body) =>{
  const colis = await Colis.create(body);
  return colis;
};

const getAllColis = async() =>{
  const colis = await Colis.findAll({
    include: {
      model: User,
      attributes: ['nom', 'prenom', 'telephone', 'email'] // Sélectionnez les colonnes que vous souhaitez récupérer de la table Utilisateurs
    }
  });
  return colis;
};

const deleteColis = async(id) =>{
  const colis =  await getColisById(id);
  return await colis.destroy()
}

module.exports = {
  createColis,
  deleteColis,
  getAllColis,
  getColisById
}