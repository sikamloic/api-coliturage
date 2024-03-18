const express = require('express');
const router = express.Router();
const {vehiculeController} = require('../controllers');
const auth = require('../middlewares/auth');

router.post('/add', vehiculeController.addVehicule);
router.route('/:id')
    .get(vehiculeController.getVehiculeById)
// router.get('/', userController.getAllUser)

module.exports = router;