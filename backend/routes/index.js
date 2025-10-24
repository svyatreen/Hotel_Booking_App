const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/rooms', require('./rooms'));
router.use('/bookings', require('./bookings'));

module.exports = router;
