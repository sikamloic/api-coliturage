const express = require('express');
const router = express.Router();
const {searchController} = require('../controllers');

router.get('/', searchController.searchDepartArriveeDate);
router.get('/actualite', searchController.actualite);

module.exports = router;