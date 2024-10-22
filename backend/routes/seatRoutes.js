const express = require('express');
const { getAllSeats, bookSeats } = require('../controllers/seatController');
const router = express.Router();

router.route('/').get(getAllSeats).post(bookSeats);

module.exports = router;
