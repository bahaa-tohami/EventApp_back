import { Server } from 'socket.io';


export const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('Un client est connecté');

    // Envoie des messages en temps réel lors de l'ajout
    socket.on('newMessage', async (messageContent) => {
      // const newMessage = await Message.create({ content: messageContent });
      console.log(messageContent);
       // io.emit('message', "bonjour");
    });

    socket.on('disconnect', () => {
      console.log('Client déconnecté');
    });
  });

  return io;
};