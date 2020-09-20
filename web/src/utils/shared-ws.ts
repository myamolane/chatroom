// import tabex from 'tabex';

// export default class SharedWs {
//   instance = tabex();
//   ws: WebSocket | null = null;
//   trackedChannels = {};

//   init() {
//     this.instance.on('sys')
//   }

//   onMasterChange() {
//     this.instance.on('!sys.master', (data) {
//       // If new master is in our tab - connect
//       if (data.node_id === data.master_id) {
//         if (!this.ws) {
//           this.ws = new WebSocket('ws://123.207.136.134:9010/ajaxchattest');
//         }
//         return;
//       }

//       // If new master is in another tab - make sure to destroy zombie connection.
//       if (this.ws) {
//         this.ws.close();
//         this.ws = null;
//         this.trackedChannels = {};
//       }
//     })
//   }

//   onChanelRefresh() {
//     this.instance.on('!sys.channels.refresh', (data) {
//       if (!this.ws) {
//         return;
//       }
//       // Filter channels by prefix `local.` and system channels (starts with `!sys.`)
//       var channels = data.channels.filter(function (channel) {
//         return channel.indexOf('local.') !== 0 && channel.indexOf('!sys.') !== 0;
//       });
//       const { trackedChannels } = this;
//       // Unsubscribe removed channels
//       Object.keys(trackedChannels).forEach(function (channel) {
//         if (data.channels.indexOf(channel) === -1) {
//           trackedChannels[channel].cancel();
//           delete trackedChannels[channel];
//         }
//       });

//       // Subscribe to new channels
//       data.channels.forEach((channel) {
//         if (!trackedChannels.hasOwnProperty(channel)) {
//           trackedChannels[channel] = this.ws?.onmessage
//           trackedChannels[channel] = fayeClient.subscribe('/' + channel.replace(/\./g, '!!'), function (message) {
//             flive.emit(channel, message.data);
//           });
//         }
//       });
//     })
//   }
// }