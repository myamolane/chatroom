import * as SocketIO from 'socket.io';
import { getDatabase } from './app/database';

export function initSocket(app) {
  const serverSocket = SocketIO(app.server, {
    serverClient: false,
  } as SocketIO.ServerOptions);
  addEventListeners(serverSocket);
}

function addEventListeners(serverSocket: SocketIO.Server) {
  serverSocket.on('join', (_, data) => {
    console.log('data:', data);
  })
  serverSocket.on('connect', (socket) => {
    serverSocket.sockets.emit('hello');
    addClientEventListeners(socket);
  })
  serverSocket.on('disconnect', (_) => {
    console.log('disconnect');
  })
}

function addClientEventListeners(socket: SocketIO.Socket) {
  socket.on('msg', (msg, type = 'text') => {
    const { messages } = getDatabase();
    const message = messages.add({ content: msg, type });
    socket.server.sockets.emit('msg', message);
  })
  socket.on('join', (room) => {
    console.log('room:', room);
  })
  socket.on('register', (id, name) => {
    const { users } = getDatabase();
    const user = users.addOrUpdate({ id, name });
    socket.server.sockets.emit('register', user);
  })
}