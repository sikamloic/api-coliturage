const express = require('express');
const router = express.Router();
const {userController} = require('../controllers');
const auth = require('../middlewares/auth');

router.post('/create', userController.createUser);
router.route('/:id')
    .get(auth(), userController.getUserById)
router.get('/', userController.getAllUser)
module.exports = router;