import useUserStore from '@/store/user';
import { createLeaderElection, BroadcastChannel } from 'broadcast-channel';
import getChannel from './channel';
import getSocket from './socket';

const channel = new BroadcastChannel('foobar');

const elector = createLeaderElection(channel, {
  fallbackInterval: 2000, // optional configuration for how often will renegotiation for leader occur
  responseTime: 1000, // optional configuration for how long will instances have to respond
});

let webSocket: any = null;
const destroy = () => {
  if (webSocket) {
    webSocket.close();
  }
}

const chanelSocket = getChannel(channel, elector);

const sharedWs = {
  eventListeners: {},
  getEventListeners(event) {
    return this.eventListeners[event] || [];
  },
  on(event, cb) {
    if (!this.eventListeners[event] && webSocket) {
      socketOnEvent(webSocket, event);
    }
    const listeners = this.getEventListeners(event);
    this.eventListeners[event] = [...listeners, cb];
  },
  off(event, cb) {
    const listeners = this.getEventListeners(event);
    this.eventListeners[event] = listeners.filter(callback => callback !== cb);
  },
  emit(event, ...args) {
    chanelSocket.emit(event, ...args);
    if (webSocket) {
      webSocket.emit(event, ...args);
    }
  }
}
const onChanelMessage = (event) => {
  const { e, ev, args } = event;
  if (elector.isLeader) {
    if (e === 'emit') {
      webSocket.emit(ev, ...args);
    }
    return;
  }
  const cbs = sharedWs.getEventListeners(e);
  cbs.forEach(cb => cb(...args));
};
channel.addEventListener('message', onChanelMessage);

function socketOnEvent (socket: SocketIOClient.Socket, event) {
  socket.on(event, (...args) => {
    const cbs = sharedWs.getEventListeners(event);
    cbs.forEach(cb => cb(...args));
    chanelSocket.emit(event, ...args);
  });
};



const initScoekt = (socket: SocketIOClient.Socket) => {
  socket.on('connect', () => {
    socket.emit('register', useUserStore.data?.user.id);
  })

  const events = Object.keys(sharedWs.eventListeners);

  events.forEach(event => {
    socketOnEvent(socket, event);
  })
}

elector.awaitLeadership().then(()=> {
  webSocket = getSocket();
  initScoekt(webSocket);
  window.addEventListener('unload', destroy);
})

export default sharedWs;
