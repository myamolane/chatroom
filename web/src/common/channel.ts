import { BroadcastChannel, LeaderElector } from 'broadcast-channel';

const getChannel = (channel: BroadcastChannel, elector: LeaderElector) => {
  return {
    emit(event, ...args) {
      if (!elector.isLeader) {
        channel.postMessage({
          e: 'emit',
          ev: event,
          args,
        })
        return;
      }
      channel.postMessage({
        e: event,
        args,
      })
    },
  }
}

export default getChannel;
