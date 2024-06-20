const { body } = require('express-validator');

const validateMatch = [
    body('from.lat').isFloat({ min: -90, max: 90 }),
    body('from.lng').isFloat({ min: -180, max: 180 }),
    body('to.lat').isFloat({ min: -90, max: 90 }),
    body('to.lng').isFloat({ min: -180, max: 180 }),
    body('point.lat').isFloat({ min: -90, max: 90 }),
    body('point.lng').isFloat({ min: -180, max: 180 })
];

module.exports = { validateMatch };
