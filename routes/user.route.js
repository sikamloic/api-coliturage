const express = require('express');
const router = express.Router();
const {userController} = require('../controllers');
const auth = require('../middlewares/auth');

router.post('/create', userController.createUser);
router.route('/:id')
    .get( userController.getUserById)
    .patch(userController.updateUserById)
router.get('/', userController.getAllUser)
module.exports = router;