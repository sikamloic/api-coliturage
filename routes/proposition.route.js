const express = require('express');
const router = express.Router();
const {propositionController} = require('../controllers');
const auth = require('../middlewares/auth');

router.post('/create', propositionController.createProposition);

module.exports = router;