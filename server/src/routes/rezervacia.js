const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const RezervaciaController = require('../controllers/RezervaciaController');

router.get('/', checkAuth, RezervaciaController.get_all);
router.get('/:rezervaciaID', checkAuth, RezervaciaController.get_one);

router.post('/', RezervaciaController.create);

router.patch('/:rezervaciaID', checkAuth, RezervaciaController.patch_one);

router.delete('/:rezervaciaID', checkAuth, RezervaciaController.remove_one);


module.exports = router;