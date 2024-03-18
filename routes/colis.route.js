const express = require('express');
const router = express.Router();
const {colisController} = require('../controllers');
const auth = require('../middlewares/auth');

router.post('/create', colisController.createColis);
router.route('/:id')
    .get(colisController.getColisById)
    // .patch(colisController)
    .delete(colisController.deleteColis)
router.get('/statut/:userId', colisController.getColisByUserIdAndStatut);
router.get('/statut', colisController.getColisByStatut);
router.get('/', colisController.getAllColis);
router.get('/no/:userId', colisController.getColisNotBelongingToUserId);
module.exports = router;