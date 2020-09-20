import io from 'socket.io-client';

const getSocket = () => {
  const socket = io('ws://localhost:7001');;
  return {
    on(event, cb) {
      socket.on(event, cb);
    },
    off(event, cb) {
      socket.off(event, cb);
    },
    emit(event, ...args) {
      socket.emit(event, ...args);
    },
    destroy() {
      socket.removeAllListeners();
      socket.disconnect();
    }
  }
}

export default getSocket;
