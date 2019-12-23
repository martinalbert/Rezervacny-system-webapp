const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const PoradovnikController = require('../controllers/PoradovnikController');

router.get('/', checkAuth, PoradovnikController.get_all);
router.get('/:poradovnikID', checkAuth, PoradovnikController.get_one);

router.post('/', PoradovnikController.create);

router.patch('/:poradovnikID', checkAuth, PoradovnikController.patch_one);

router.delete('/:poradovnikID', checkAuth, PoradovnikController.remove_one);



module.exports = router;