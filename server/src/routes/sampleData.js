const express = require('express');
const router = express.Router();
const controller = require('../controllers/SampleData');

router.post('/', controller);

module.exports = router;