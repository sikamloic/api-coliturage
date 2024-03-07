const {authController} = require('../controllers');
const express = require('express');

const router = express.Router();

router.post('/login', authController.loginWithPhoneNumberAndPassword)

module.exports = router