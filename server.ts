import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"]
  }
});

let realGender = 'girl'; // or 'boy', based on your choice
let fakeMessage = "It's twins!";
let guessingPhase = true;
let countdownPhase = false;
let revealPhase = false;

const stats = {
  boy: 0,
  girl: 0,
};

// Handle guest guesses
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Guests can submit their guess
  socket.on('guess', (gender: 'boy' | 'girl') => {
    if (guessingPhase) {
      console.log(`Guest guessed: ${gender}`);
      stats[gender]++;
      io.emit('guessMade', gender);  // Broadcast guesses to all clients
      io.emit('updateStats', stats); // Update stats
    }
  });

  // Admin starts the countdown
  socket.on('startCountdown', () => {
    guessingPhase = false;
    countdownPhase = true;
    let countdownValue = 10;
    io.emit('countdownStarted', countdownValue);

    const countdownInterval = setInterval(() => {
      countdownValue--;
      if (countdownValue >= 0) {
        io.emit('countdownUpdate', countdownValue);
      } else {
        clearInterval(countdownInterval);
        countdownPhase = false;
        io.emit('fakeReveal', fakeMessage);

        // Add surprise message after 10 seconds
        setTimeout(() => {
          io.emit('surpriseMessage', "Oh that's not true!");
        }, 10000);
      }
    }, 1000);
  });

  // Admin reveals the true gender
  socket.on('revealGender', () => {
    revealPhase = true;
    io.emit('countdownStarted', 10); // Start a new countdown for reveal
    let countdownValue = 10;
    
    const countdownInterval = setInterval(() => {
      countdownValue--;
      if (countdownValue >= 0) {
        io.emit('countdownUpdate', countdownValue);
        if (countdownValue === 5) {
          io.emit('halfwayMessage', `Be Gao is a ...`);
        }
      } else {
        clearInterval(countdownInterval);
        io.emit('realReveal', realGender);
      }
    }, 1000);
  });

  // Admin resets the guest frontend
  socket.on('reset', () => {
    guessingPhase = true;
    countdownPhase = false;
    revealPhase = false;
    stats.boy = 0;
    stats.girl = 0;
    io.emit('resetGuestFrontend');
  });
});

// server.listen(3000, () => {
//   console.log('Backend running on port 3000');
// });

// This will listen on all interfaces
server.listen(3000, '0.0.0.0', () => {
  console.log('Backend running on port 3000');
});

