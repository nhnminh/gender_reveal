import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://192.168.1.53:3000');

// 192.168.1.53

const AdminApp: React.FC = () => {
  const [countdownStarted, setCountdownStarted] = useState(false);
  const [genderRevealed, setGenderRevealed] = useState(false);

  const startCountdown = () => {
    setCountdownStarted(true);
    socket.emit('startCountdown');
  };

  const revealGender = () => {
    setGenderRevealed(true);
    socket.emit('revealGender');
  };

  const resetGuests = () => {
    setCountdownStarted(false);
    setGenderRevealed(false);
    socket.emit('reset');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Admin Control Panel</h1>
      {!countdownStarted && !genderRevealed && (
        <button onClick={startCountdown} style={{ padding: '10px 20px', fontSize: '18px' }}>
          Start Countdown
        </button>
      )}
      {countdownStarted && !genderRevealed && (
        <button onClick={revealGender} style={{ padding: '10px 20px', fontSize: '18px' }}>
          Reveal Gender
        </button>
      )}
      <button onClick={resetGuests} style={{ padding: '10px 20px', fontSize: '18px', marginTop: '20px' }}>
        Reset Guests
      </button>
    </div>
  );
};

export default AdminApp
