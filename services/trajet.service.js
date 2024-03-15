const {Trajet, User} = require('../models');
const ApiError = require('../utils/apiError');
const httpStatus = require('http-status');
const userService = require('./user.service');

const createTrajet = async(body) =>{
    try{
        const user = await userService.getUserById(body.userId);
        const trajet = await Trajet.create(body);
        return trajet;
    }
    catch(err){
        throw new ApiError(httpStatus.BAD_REQUEST, err);
    }
};

const getTrajetById = async(id) =>{
    try {
        const trajet = await Trajet.findByPk(id);
        if (!trajet) throw new ApiError(httpStatus.BAD_REQUEST, 'Trajet non trouvé !!!')
        return trajet;
    } catch (err) {
        throw new ApiError(httpStatus.BAD_REQUEST, err);
    }
};

const getTrajetByStatut = async(statut) =>{
    try{
      const trajet = await Trajet.findAll({
        attributes: ['id', 'poidsAutorise', 'tailleAutorisee', 'depart', 'arrivee', 'statut', 'date'],
        include: {
          model: User,
          attributes: ['nom', 'prenom', 'telephone', 'email'] // Sélectionnez les colonnes que vous souhaitez récupérer de la table Utilisateurs
        },
        where: {
          statut: statut
        }
      });
      return trajet;
    }
    catch (err){
      throw new ApiError(httpStatus.BAD_REQUEST, err)
    }
};
  
const getTrajetByUserIdAndStatut = async(userId, statut) =>{
    try{
        await userService.getUserById(userId);
        const trajet = await Trajet.findAll({
        attributes: ['id', 'poidsAutorise', 'tailleAutorisee', 'depart', 'arrivee', 'statut', 'date'],
        include: {
            model: User,
            attributes: ['nom', 'prenom', 'telephone', 'email'] // Sélectionnez les colonnes que vous souhaitez récupérer de la table Utilisateurs
        },
        where: {
            userId: userId,
            statut: statut
        }
        });
        return trajet;
    }
    catch (err){
        throw new ApiError(httpStatus.BAD_REQUEST, err)
    }
};

const deleteTrajet = async(id) =>{
    try {
        const trajet = await getTrajetById(id);
        if (trajet.statut !== 'en attente') {
            throw new ApiError(httpStatus.BAD_REQUEST, "Seul les trajets ayant le statut 'en attende' peuvent être supprimé !!!");
        }
        await trajet.destroy();
        return trajet;
    } catch (err) {
        throw new ApiError(httpStatus.BAD_REQUEST, err);
    }
};

const updateStatutTrajet = async(id, status) =>{
    try{
        const trajet = getTrajetById(id)
        trajet.set('statut', status);
        return await trajet.save();
    }
    catch(err){
        throw new ApiError(httpStatus.BAD_REQUEST, err);
    }
}

module.exports = {
    createTrajet,
    deleteTrajet,
    getTrajetById,
    getTrajetByStatut,
    getTrajetByUserIdAndStatut,
    updateStatutTrajet
}