const express = require('express');
const router = express.Router();
const { getRoute } = require('../controllers/routeController');
const validateRequest = require('../middlewares/validateRequest');
const { validateRoute } = require('../validations/routeValidation');

router.post('/', validateRoute, validateRequest, getRoute);

module.exports = router;
