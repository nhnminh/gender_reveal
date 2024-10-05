import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css'; // For custom animations and styles

// const socket = io(process.env.REACT_APP_MY_HOST || 'http://localhost:3000');

const socket = io('http://192.168.1.53:3000');
const App: React.FC = () => {
  const [guess, setGuess] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [fakeMessage, setFakeMessage] = useState<string | null>(null);
  const [realGender, setRealGender] = useState<string | null>(null);
  const [surpriseMessage, setSurpriseMessage] = useState<string | null>(null);
  const [halfwayMessage, setHalfwayMessage] = useState<string | null>(null);
  const [stats, setStats] = useState({ boy: 0, girl: 0 });

  useEffect(() => {
    socket.on('countdownStarted', (count: number) => setCountdown(count));
    socket.on('countdownUpdate', (count: number) => setCountdown(count));
    socket.on('fakeReveal', (message: string) => {
      setFakeMessage(message);
      setCountdown(null); // Reset countdown
    });
    socket.on('surpriseMessage', (message: string) => {
      setSurpriseMessage(message);
    });
    socket.on('halfwayMessage', (message: string) => {
      setHalfwayMessage(message);
    });
    socket.on('realReveal', (gender: string) => {
      setFakeMessage(null); // Remove fake message
      setSurpriseMessage(null); // Remove surprise message
      setHalfwayMessage(null); // Remove halfway message
      setRealGender(gender);
      setCountdown(null); // Reset countdown
    });
    socket.on('updateStats', (updatedStats: { boy: number; girl: number }) => {
      setStats(updatedStats);
    });
    socket.on('resetGuestFrontend', () => {
      setGuess(null);
      setCountdown(null);
      setFakeMessage(null);
      setRealGender(null);
      setSurpriseMessage(null);
      setHalfwayMessage(null);
      setStats({ boy: 0, girl: 0 });
    });
  }, []);

  const handleGuess = (gender: 'boy' | 'girl') => {
    setGuess(gender);
    socket.emit('guess', gender);
  };

  return (
    <div className="App">
      {!realGender && !fakeMessage && !surpriseMessage && !halfwayMessage && (
        <div>
          <h1>Guess the Baby's Gender!</h1>
          <button 
            onClick={() => handleGuess('boy')} 
            className={guess === 'boy' ? 'guess-button highlighted-blue' : 'guess-button'}
            disabled={!!guess}>
            Boy
          </button>
          <button 
            onClick={() => handleGuess('girl')} 
            className={guess === 'girl' ? 'guess-button highlighted-pink' : 'guess-button'}
            disabled={!!guess}>
            Girl
          </button>
        </div>
      )}

      {countdown !== null && <h2 className="countdown">{countdown}</h2>}

      {!halfwayMessage && fakeMessage && (
        <h2 className="fakeMessage booming">{fakeMessage}</h2>
      )}

      {!halfwayMessage && surpriseMessage && (
        <h2 className="surpriseMessage">{surpriseMessage}</h2>
      )}

      {halfwayMessage && (
        <h2 className="halfwayMessage">{halfwayMessage}</h2>
      )}

      {realGender && (
        <div className="reveal-container">
          <h2 className="realMessage">It's a {realGender.charAt(0).toUpperCase() + realGender.slice(1)}!</h2>
          <div className="balloons">🎈🎈🎈🎈🎈🎈🎈🎈</div>
          {stats && (
              <div className="stats">
                <h3>Statistics:</h3>
                <p>Boy: {((stats.boy / (stats.boy + stats.girl)) * 100).toFixed(2)}%</p>
                <p>Girl: {((stats.girl / (stats.boy + stats.girl)) * 100).toFixed(2)}%</p>
              </div>
          )}
        </div>
      )}

      
    </div>
  );
};

export default App;
