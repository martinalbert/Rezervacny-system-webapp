const UbytovanyController = require('../controllers/UbytovanyController');
const express = require('express');
const router = express.Router();
// const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

// router.post('/', UbytovanyController.createUser);
router.get('/', UbytovanyController);

module.exports = router;