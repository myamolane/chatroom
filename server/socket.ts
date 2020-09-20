import { IChatroom, IMessage } from 'shared/interface/model';
import * as SocketIO from 'socket.io';
import { getDatabase } from './app/database';

export function initSocket(app) {
  const serverSocket = SocketIO(app.server, {
    serverClient: false,
  } as SocketIO.ServerOptions);
  addEventListeners(serverSocket);
}

function addEventListeners(serverSocket: SocketIO.Server) {
  serverSocket.on('connect', socket => {
    addClientEventListeners(socket);
  });
}

function addClientEventListeners(socket: SocketIO.Socket) {
  socket.on('msg', (msg: IMessage, chatroomId) => {
    const { chatrooms, users } = getDatabase();

    const chatroom = chatrooms.findOne(chatroomId);
    if (!chatroom) {
      console.error(`chatroom ${chatroomId} not exist`);
      return;
    }
    const user = users.findOne(msg.user);
    const newMessagee = { ...msg, type: msg.type || 'text', userName: user.name };
    chatroom.messages.push(newMessagee);
    chatrooms.update(chatroom);
    socket.server.emit('msg', newMessagee, chatroomId);
  });
  socket.on('register', id => {
    const { users } = getDatabase();
    const userData = users.findOne(id);
    const user = users.addOrUpdate({ id, ...userData });
    socket.server.sockets.emit('register', user);
  });
  socket.on('join', (user, chatroomId = 'default') => {
    const { users, chatrooms } = getDatabase();
    const { id } = user;
    const userData = users.findOne(id);
    if (!userData) {
      console.log('user not registered');
      return;
    }
    const chatroom: IChatroom = chatrooms.findOne(chatroomId);
    const joined = !!chatroom.users.find(userId => user.id === userId);
    if (joined) {
      console.log('user joined');
      return;
    }
    chatroom.users.push(id);
    chatrooms.update(chatroom);
    socket.join(chatroomId);
    console.log(`${user.id} join ${chatroomId}`);
    socket.to(chatroomId).emit('join', userData, chatroom);
  });
  socket.on('disconnect', () => {
    socket.leaveAll();
  });
}
