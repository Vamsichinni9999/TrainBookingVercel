import React, { useState, useEffect } from 'react';
import SeatMap from './components/SeatMap';

const App = () => {
  const [seats, setSeats] = useState([]);

  // Fetch all seats from backend
  useEffect(() => {
    const fetchSeats = async () => {
      const res = await fetch('https://trainbookingunstop.onrender.com/api/seats');
      const data = await res.json();
      setSeats(data);
    };
    fetchSeats();
  }, []);

  // Handle booking logic
  const handleBooking = async (numSeats) => {
    const res = await fetch('https://trainbookingunstop.onrender.com/api/seats', { // URL points to your backend
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ numSeats }),  // Send the number of seats requested
    });

    if (res.ok) {
      const bookedSeats = await res.json();
      alert(`Booked seats: ${bookedSeats.join(', ')}`);
      window.location.reload();  // Reload the page to update the seat map
    } else {
      alert('Error booking seats.');
    }
  };

  return (
    <div>
      <h1>Train Seat Booking System</h1>
      <SeatMap seats={seats} />  {/* Display seat map */}
      <div>
        <input type="number" id="numSeats" min="1" max="7" />
        <button onClick={() => handleBooking(document.getElementById('numSeats').value)}>
          Book Seats
        </button>
      </div>
    </div>
  );
};

export default App;
