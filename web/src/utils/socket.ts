import useUserStore from '@/store/user';
import io from 'socket.io-client';

export const socket = io('ws://localhost:7001');

socket.connect();

socket.on('connect', () => {
  console.log('connect:', socket.connected); // true
  socket.emit('register', useUserStore.data?.user.id);
});

socket.on('disconnect', () => {
  console.log('disconnect:', socket.connected); // false
});
