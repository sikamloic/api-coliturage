const express = require('express');
const router = express.Router();
const {trajetController} = require('../controllers');
const auth = require('../middlewares/auth');

router.post('/create', trajetController.createTrajet);
router.route('/:id')
    .get(trajetController.getTrajetById)
    .delete(trajetController.deleteTrajet)
router.get('/statut/:userId', trajetController.getTrajetByUserIdAndStatut);
router.get('/statut', trajetController.getTrajetByStatut);
router.get('/', trajetController.getTrajetByStatut)
module.exports = router;