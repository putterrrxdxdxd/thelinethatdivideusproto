// src/server.ts
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { initSockets } from './socket.js';
import { connectDB } from './db.js';
import { fileURLToPath } from 'url';

dotenv.config(); // Load .env variables

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: '*' }, // Allow all origins for now
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files later (for Media API)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Test API route
app.get('/', (req, res) => res.send('🎉 Backend is running!'));

// Initialize Socket.IO
initSockets(io);

// Start server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});
