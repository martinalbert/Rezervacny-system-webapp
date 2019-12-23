const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const Zamestnanec_internatovController = require('../controllers/Zamestnanec_internatovController');

router.get('/', checkAuth, Zamestnanec_internatovController.get_all);
router.get('/:zamestnanecID', checkAuth, Zamestnanec_internatovController.get_one);

router.post('/', Zamestnanec_internatovController.create);

router.patch('/:zamestnanecID', checkAuth, Zamestnanec_internatovController.patch_one);

router.delete('/:zamestnanecID', checkAuth, Zamestnanec_internatovController.remove_one);

module.exports = router;