const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const ObjednavkaController = require('../controllers/ObjednavkaController');

router.get('/', checkAuth, ObjednavkaController.get_all);
router.get('/:objednavkaID', checkAuth, ObjednavkaController.get_one);

router.post('/', ObjednavkaController.create);

router.patch('/:objednavkaID', checkAuth, ObjednavkaController.patch_one);

router.delete('/:objednavkaID', checkAuth, ObjednavkaController.remove_one);


module.exports = router;