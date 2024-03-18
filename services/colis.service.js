const {Colis, User} = require('../models');
const ApiError = require('../utils/apiError');
const httpStatus = require('http-status');
const userService = require('./user.service');
const { Sequelize } = require('sequelize');

const getColisById = async(id) =>{
  try{
    const colis = await Colis.findByPk(id);
    if(!colis) throw new  ApiError(httpStatus.NOT_FOUND, 'Id du colis  introuvable !!!');
    return colis;
  }
  catch (err){
    throw new ApiError(httpStatus.BAD_REQUEST, err)
  }
};

const createColis = async(body) =>{
  try{
    const user = await userService.getUserById(body.userId);
    const colis = await Colis.create(body);
    return {colis, user};
  }
  catch (err){
    throw new ApiError(httpStatus.BAD_REQUEST, err)
  }
};

const getAllColis = async() =>{
  try{
    const colis = await Colis.findAll({
      attributes: ['id', 'poids', 'taille', 'depart', 'arrivee', 'statut', 'nom'],
      include: {
        model: User,
        attributes: ['nom', 'prenom', 'telephone', 'email'] // Sélectionnez les colonnes que vous souhaitez récupérer de la table Utilisateurs
      }
    });
    return colis;
  }
  catch (err){
    throw new ApiError(httpStatus.BAD_REQUEST, err)
  }
};

const deleteColis = async(id) =>{
  const colis =  await getColisById(id);
  return await colis.destroy()
};

const getColisByStatut = async(statut) =>{
  try{
    const colis = await Colis.findAll({
      attributes: ['id', 'poids', 'taille', 'depart', 'arrivee', 'statut', 'nom'],
      include: {
        model: User,
        attributes: ['nom', 'prenom', 'telephone', 'email'] // Sélectionnez les colonnes que vous souhaitez récupérer de la table Utilisateurs
      },
      where: {
        statut: statut
      }
    });
    return colis;
  }
  catch (err){
    throw new ApiError(httpStatus.BAD_REQUEST, err)
  }
};

const getColisByUserIdAndStatut = async(userId, statut) =>{
  try{
    await userService.getUserById(userId);
    const colis = await Colis.findAll({
      attributes: ['id', 'poids', 'taille', 'depart', 'arrivee', 'statut', 'nom', 'date', 'description'],
      include: {
        model: User,
        attributes: ['nom', 'prenom', 'telephone', 'email'] // Sélectionnez les colonnes que vous souhaitez récupérer de la table Utilisateurs
      },
      where: {
        userId: userId,
        statut: statut
      }
    });
    return colis;
  }
  catch (err){
    throw new ApiError(httpStatus.BAD_REQUEST, err)
  }
};

const getColisNotBelongingToUserId = async(userId) =>{
  try {
      const colis = await Colis.findAll({
        attributes: ['id', 'poids', 'taille', 'depart', 'arrivee', 'statut', 'nom', 'date', 'description'],
        include: {
          model: User,
          attributes: ['nom', 'prenom', 'telephone', 'email'] // Sélectionnez les colonnes que vous souhaitez récupérer de la table Utilisateurs
        },
        where: {
          userId: {
            [Sequelize.Op.ne]: userId
          }
        }
      });
      return colis;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, err)
  }
}

module.exports = {
  createColis,
  deleteColis,
  getAllColis,
  getColisById,
  getColisByUserIdAndStatut,
  getColisByStatut,
  getColisNotBelongingToUserId
}