import './scss/styles.scss';
import io from 'socket.io-client';
import DDD from './js/DDD';

const socket = io();
console.log(socket);
socket.once('disconnect', res => console.log(res));
socket.once('connect', () => new DDD(socket));
