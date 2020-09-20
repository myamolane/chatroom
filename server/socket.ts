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
  serverSocket.on('connect', (socket) => {
    addClientEventListeners(socket);
  })
  serverSocket.on('disconnect', (_) => {
    console.log('disconnect');
  })
}

function addClientEventListeners(socket: SocketIO.Socket) {
  socket.on('msg', (msg: IMessage, chatroomId) => {
    // if (!socket.rooms[chatroomId]) {
    //   console.log('not in rooms');
    //   return;
    // }
    const { chatrooms } = getDatabase();

    const chatroom = chatrooms.findOne(chatroomId);
    if (!chatroom) {
      console.error(`chatroom ${chatroomId} not exist`);
      return;
    }
    const newMessagee = { ...msg, type: 'text' || msg.type };
    chatroom.messages.push(newMessagee);
    chatrooms.update(chatroom);
    socket.server.emit('msg', newMessagee, chatroomId);
    // socket.server.to(chatroomId).emit('msg', newMessagee, chatroomId);
  })
  socket.on('register', (id, name) => {
    const { users } = getDatabase();
    const user = users.add({ id, name });
    socket.server.sockets.emit('register', user);
  })
  socket.on('join', (user, chatroomId = 'default') => {
    const { users, chatrooms } = getDatabase();
    const { id } = user;
    const userData = users.findOne(id);
    if (!userData) {
      console.log('user not registered');
      return;
    }
    const chatroom: IChatroom = chatrooms.findOne(chatroomId);
    const joined = !!chatroom.users.find(user => user.id === id);
    if (joined) {
      console.log('user joined');
      return;
    }
    chatroom.users.push(user);
    chatrooms.update(chatroom);
    socket.join(chatroomId);
    console.log(`${user.id} join ${chatroomId}`);
    socket.to(chatroomId).emit('join', user, chatroom);
  })
  // socket.on('disconnect', () => {
  //   socket.leaveAll();
  // })
}