import { BroadcastChannel, LeaderElector } from 'broadcast-channel';

const getChannel = (channel: BroadcastChannel, elector: LeaderElector) => {
  const eventCbMap = {};
  const getEventCb = e => eventCbMap[e] || [];
  const onMessage = (event) => {
    if (elector.isLeader) {
      return;
    }
    const { e, args } = event;
    const cbs = getEventCb(e);
    cbs.forEach(cb => cb(...args));
  };
  channel.addEventListener('message', onMessage);

  return {
    on(event, cb) {
      const cbs = getEventCb(event);
      eventCbMap[event] =  [...cbs, cb];
    },
    off(event, cb) {
      const cbs = getEventCb(event);
      eventCbMap[event] = cbs.filter(callback => callback !== cb);
    },
    emit(event, ...args) {
      if (!elector.isLeader) {
        return;
      }
      channel.postMessage({
        e: event,
        args,
      })
    },
    destroy() {
      channel.removeEventListener('message', onMessage);
    },
  }
}

export default getChannel;
