
import io from 'socket.io-client';

const socket = io('http://localhost:4000', { transports: ['websocket'], upgrade: false });

const CommunicationsService = {
  connect() {
    socket.on('connect', () => {
      console.log('Conectado al servidor de chat');
    });

    socket.on('disconnect', () => {
      console.log('Desconectado del servidor de chat');
    });
  },

  onMessageReceived(callback) {
    socket.on('chatToClient', callback);
  },

  sendMessage(sender, room, message) {
    socket.emit('chatToServer', { sender, room, message });
  },

  joinRoom(roomId) {
    socket.emit('joinRoom', roomId);
  },

  onLoadMessages(callback) {
    socket.on('loadMessages', callback);
  }
};

export default CommunicationsService;