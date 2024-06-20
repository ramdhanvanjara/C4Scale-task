const express = require('express');
const router = express.Router();
const { matchPoint } = require('../controllers/matchController');
const validateRequest = require('../middlewares/validateRequest');
const { validateMatch } = require('../validations/matchValidation');


router.post('/', validateMatch, validateRequest, matchPoint);
module.exports = router;
