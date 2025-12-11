import { Server } from 'socket.io';

let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true,
    },
    transports: ['websocket', 'polling'],
  });

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Subscribe to election updates
    socket.on('subscribe:election', (electionId) => {
      console.log(`Client ${socket.id} subscribed to election ${electionId}`);
      socket.join(`election:${electionId}`);
    });

    // Unsubscribe from election updates
    socket.on('unsubscribe:election', (electionId) => {
      console.log(`Client ${socket.id} unsubscribed from election ${electionId}`);
      socket.leave(`election:${electionId}`);
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

// Emit new vote to all clients subscribed to an election
export const emitNewVote = (electionId, voteData) => {
  if (io) {
    io.to(`election:${electionId}`).emit(`election:${electionId}:vote`, voteData);
    console.log(`Emitted new vote for election ${electionId}`);
  }
};

// Emit election update to all clients
export const emitElectionUpdate = (electionId, updateData) => {
  if (io) {
    io.to(`election:${electionId}`).emit(`election:${electionId}:update`, updateData);
    console.log(`Emitted election update for ${electionId}`);
  }
};

// Broadcast to all connected clients
export const broadcastMessage = (event, data) => {
  if (io) {
    io.emit(event, data);
  }
};
