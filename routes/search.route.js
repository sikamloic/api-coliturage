const express = require('express');
const router = express.Router();
const {searchController} = require('../controllers');

router.get('/', searchController.searchDepartArriveeDate);

module.exports = router;