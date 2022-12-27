import {sendUnreadMessage} from 'api/conversation';
import {Conversation} from 'services/types/conversation';
import {io} from 'socket.io-client';
import {useAuth} from 'store';
import useConversations from 'store/conversation';
import {API_URL} from '../api/contants';

export const socket = io(API_URL as string);

export const initSockets = (conversations: Conversation[]) => {
  conversations.forEach(conversation => {
    socket.emit('join-room', conversation.matchId);
  });

  socket.on('receive-message', async data => {
    console.log('received!');
    try {
      const res = await sendUnreadMessage({
        matchId: data.room,
        message: data.msg,
      });

      console.log('unread res', res);
      // useConversations.getState().setConversations(newConversations);
    } catch (error) {
      console.log('unread error', error);
    }
  });
};
