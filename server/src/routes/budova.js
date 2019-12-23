const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const BudovaController = require('../controllers/BudovaController');

router.get('/', checkAuth, BudovaController.get_all);
router.get('/:budovaID', checkAuth, BudovaController.get_one);

router.post('/', BudovaController.create);

router.patch('/:budovaID', checkAuth, BudovaController.patch_one);

router.delete('/:budovaID', checkAuth, BudovaController.remove_one);

module.exports = router;