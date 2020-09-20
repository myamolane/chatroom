import { createLeaderElection, BroadcastChannel } from 'broadcast-channel';
import getChannel from './channel';
import getSocket from './socket';

const channel = new BroadcastChannel('foobar');

const elector = createLeaderElection(channel, {
  fallbackInterval: 2000, // optional configuration for how often will renegotiation for leader occur
  responseTime: 1000, // optional configuration for how long will instances have to respond
});

let webSocket: any = null;
elector.awaitLeadership().then(()=> {
  console.log('this tab is now leader');
  webSocket = getSocket();
})

const chanelSocket = getChannel(channel, elector);

export default {
  on(event, cb) {
    chanelSocket.on(event, cb);
    if (webSocket && elector.isLeader) {
      webSocket.on(event, cb);
    }
  },
  off(event, cb) {
    chanelSocket.off(event, cb);
    if (webSocket && elector.isLeader) {
      webSocket.off(event, cb);
    }
  },
  emit(event, ...args) {
    if (webSocket) {
      webSocket.emit(event, ...args);
    }
  }
}
