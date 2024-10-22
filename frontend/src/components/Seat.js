import React from 'react';

const Seat = ({ seat }) => {
  const style = {
    width: '50px',
    height: '50px',
    backgroundColor: seat.isBooked ? 'red' : 'green',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return <div style={style}>{seat.seatNumber}</div>;
};

export default Seat;
