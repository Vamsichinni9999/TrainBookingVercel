const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());  // To parse JSON bodies

// Example seat data
let seats = Array(80).fill().map((_, index) => ({
  seatNumber: index + 1,
  isBooked: false
}));

// GET route for fetching all seats
app.get('/api/seats', (req, res) => {
  res.json(seats);
});

// POST route for booking seats
app.post('/api/seats', (req, res) => {
  const { numSeats } = req.body;

  // Find available seats
  const availableSeats = seats.filter(seat => !seat.isBooked);

  // If enough seats are available
  if (availableSeats.length >= numSeats) {
    const bookedSeats = availableSeats.slice(0, numSeats);

    // Mark seats as booked
    bookedSeats.forEach(seat => seat.isBooked = true);

    // Return booked seat numbers
    const bookedSeatNumbers = bookedSeats.map(seat => seat.seatNumber);
    return res.json(bookedSeatNumbers);
  } else {
    return res.status(400).json({ message: 'Not enough available seats' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
