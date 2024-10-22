const mongoose = require('mongoose');

const seatSchema = mongoose.Schema({
  seatNumber: { type: Number, required: true },
  isBooked: { type: Boolean, default: false },
});

const Seat = mongoose.model('Seat', seatSchema);
module.exports = Seat;
