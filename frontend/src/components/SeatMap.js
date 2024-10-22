import React from 'react';
import './SeatMap.css'; // Add custom styles

const SeatMap = ({ seats }) => {
  return (
    <div className="seat-map">
      {seats.map((seat) => (
        <div
          key={seat.seatNumber}
          className={`seat ${seat.isBooked ? 'booked' : 'available'}`}
        >
          {seat.seatNumber}
        </div>
      ))}
    </div>
  );
};

export default SeatMap;
