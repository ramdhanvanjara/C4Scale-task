const { body } = require('express-validator');

const validateRoute = [
    body('from.lat').isFloat({ min: -90, max: 90 }),
    body('from.lng').isFloat({ min: -180, max: 180 }),
    body('to.lat').isFloat({ min: -90, max: 90 }),
    body('to.lng').isFloat({ min: -180, max: 180 })
];

module.exports = { validateRoute };

