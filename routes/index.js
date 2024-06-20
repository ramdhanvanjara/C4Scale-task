const express = require('express');
const router = express.Router();
const routeRoutes = require('./routeRoutes');
const matchRoutes = require('./matchRoutes');

router.use('/route', routeRoutes);
router.use('/match', matchRoutes);

module.exports = router;
