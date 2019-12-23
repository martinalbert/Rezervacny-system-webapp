const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const IzbaController = require('../controllers/IzbaController');

router.post('/', IzbaController.create);

router.get('/', checkAuth, IzbaController.get_all);
router.get('/:izbaID', checkAuth, IzbaController.get_one);

router.patch('/:izbaID', checkAuth, IzbaController.patch_one);

router.delete('/:izbaID', checkAuth, IzbaController.remove_one);


module.exports = router;