const Seat = require('../models/Seat');

const getAllSeats = async (req, res) => {
  const seats = await Seat.find({});
  res.json(seats);
};

const bookSeats = async (req, res) => {
  const { numSeats } = req.body;
  let availableSeats = await Seat.find({ isBooked: false });

  if (availableSeats.length < numSeats) {
    return res.status(400).json({ message: 'Not enough seats available' });
  }

  let bookedSeats = [];

  // Try to find consecutive seats in a single row
  for (let i = 0; i < availableSeats.length; i++) {
    let row = Math.floor(availableSeats[i].seatNumber / 7);
    let consecutive = availableSeats.slice(i, i + numSeats);

    if (consecutive.every(seat => Math.floor(seat.seatNumber / 7) === row)) {
      bookedSeats = consecutive;
      break;
    }
  }

  // If no consecutive seats, just pick nearest available
  if (bookedSeats.length === 0) {
    bookedSeats = availableSeats.slice(0, numSeats);
  }

  bookedSeats.forEach(async (seat) => {
    seat.isBooked = true;
    await seat.save();
  });

  res.json(bookedSeats.map(seat => seat.seatNumber));
};

module.exports = { getAllSeats, bookSeats };
