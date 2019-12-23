const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const UbytovanyController = require('../controllers/UbytovanyController');

router.get('/', checkAuth, UbytovanyController.get_all);
router.get('/:ubytovanyID', checkAuth, UbytovanyController.get_one);

router.post('/', UbytovanyController.create);
router.post('/login', UbytovanyController.user_login);
router.post('/signup', UbytovanyController.user_signup);

router.patch('/:ubytovanyID', checkAuth, UbytovanyController.patch_one);

router.delete('/:ubytovanyID', checkAuth, UbytovanyController.remove_one);

module.exports = router;