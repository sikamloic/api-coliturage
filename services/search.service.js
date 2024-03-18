const { Op, fn, col, Sequelize } = require('sequelize');
const Colis = require('../models/colis');
const Trajet = require('../models/trajet');
const User = require('../models/user');

function mixResults(arr1, arr2) {
  const combinedResults = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
      combinedResults.push(arr1[i]);
      combinedResults.push(arr2[j]);
      i++;
      j++;
  }

  // Ajouter les éléments restants s'il y en a dans l'un des tableaux
  while (i < arr1.length) {
      combinedResults.push(arr1[i]);
      i++;
  }

  while (j < arr2.length) {
      combinedResults.push(arr2[j]);
      j++;
  }

  // Mélanger le tableau combiné aléatoirement
  shuffleArray(combinedResults);
  return combinedResults;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

const searchDepartArriveeDate = async(query) =>{
  try {
    const {depart, arrivee, date} = query;
    const dateOnlyQuery = `DATE_FORMAT(date, '%Y-%m-%d')`;
    const [colis, trajet] = await Promise.all([
      Colis.findAll({
        attributes: ['id', 'poids', 'taille', 'depart', 'arrivee', 'statut', 'nom', 'date', 'description'],
        include: {
          model: User,
          attributes: ['nom', 'prenom', 'telephone', 'email']
        },
        where: {
          depart: depart,
          arrivee: arrivee,
          [Op.eq]: Sequelize.literal(dateOnlyQuery),
          statut: 'en attente'
        },
        order: Sequelize.literal('RAND()'),
      }),
      Trajet.findAll({
        attributes: ['id', 'poidsAutorise', 'tailleAutorisee', 'depart', 'arrivee', 'statut', 'date'],
        include: {
          model: User,
          attributes: ['nom', 'prenom', 'telephone', 'email']
        },
        where: {
          depart: depart,
          arrivee: arrivee,
          [Op.eq]: Sequelize.literal(dateOnlyQuery),
          statut: 'en attente'
        },
        order: Sequelize.literal('RAND()'),
      })
    ]);

    const resultat = mixResults(colis, trajet);
    return resultat;
  } 
  catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, err);
  }
};

const actualite = async() =>{
  try {
    const [colis, trajet] = await Promise.all([
      Colis.findAll({
        attributes: ['id', 'poids', 'taille', 'depart', 'arrivee', 'statut', 'nom', 'date', 'description'],
        include: {
          model: User,
          attributes: ['nom', 'prenom', 'telephone', 'email']
        },
        where: {
          statut: 'en attente'
        },
        order: Sequelize.literal('RAND()'),
      }),
      Trajet.findAll({
        attributes: ['id', 'poidsAutorise', 'tailleAutorisee', 'depart', 'arrivee', 'statut', 'date'],
        include: {
          model: User,
          attributes: ['nom', 'prenom', 'telephone', 'email']
        },
        where: {
          statut: 'en attente'
        },
        order: Sequelize.literal('RAND()'),
      })
    ]);
    const resultat = mixResults(colis, trajet);
    return resultat;
  } 
  catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, err);
  }
}

module.exports = {
  searchDepartArriveeDate,
  actualite
};