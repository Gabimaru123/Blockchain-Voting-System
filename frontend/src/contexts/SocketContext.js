import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      // Connect to Socket.IO server
      const socketUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const newSocket = io(socketUrl, {
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5,
      });

      newSocket.on('connect', () => {
        console.log('Socket connected:', newSocket.id);
        setConnected(true);
      });

      newSocket.on('disconnect', () => {
        console.log('Socket disconnected');
        setConnected(false);
      });

      newSocket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        setConnected(false);
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
        setConnected(false);
      }
    }
  }, [isAuthenticated]);

  const subscribeToElection = (electionId, callback) => {
    if (!socket) return;

    socket.emit('subscribe:election', electionId);
    socket.on(`election:${electionId}:update`, callback);

    return () => {
      socket.emit('unsubscribe:election', electionId);
      socket.off(`election:${electionId}:update`, callback);
    };
  };

  const subscribeToVotes = (electionId, callback) => {
    if (!socket) return;

    socket.on(`election:${electionId}:vote`, callback);

    return () => {
      socket.off(`election:${electionId}:vote`, callback);
    };
  };

  const value = {
    socket,
    connected,
    subscribeToElection,
    subscribeToVotes,
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};
