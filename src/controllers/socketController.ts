import {io} from 'socket.io-client';
import {API_URL} from '../api/contants';

export const socket = io(API_URL as string);
