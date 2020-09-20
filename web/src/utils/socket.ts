import { register } from '@/common/device';
import io from 'socket.io-client';

export const socket = io('ws://localhost:7001');

socket.connect();
console.log('init socket');
socket.on('connect', () => {
  console.log(socket.connected); // true
});

socket.on('hello', () => {
  console.log('hello'); // true
});

socket.on('disconnect', () => {
  console.log(socket.connected); // false
});
