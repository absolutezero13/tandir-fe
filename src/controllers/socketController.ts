import {sendUnreadMessage} from 'api/conversation';
import {services} from 'services';
import {Conversation} from 'services/types/conversation';
import {io} from 'socket.io-client';
import useConversations from 'store/conversation';
import {API_URL} from '../api/contants';

export const socket = io(API_URL as string);

export const initSockets = (conversations: Conversation[]) => {
  conversations.forEach(conversation => {
    socket.emit('join-room', conversation.matchId);
  });

  socket.on('receive-message', async data => {
    const currentRoute = services.nav.navRef.current?.getCurrentRoute();
    if (currentRoute?.name === 'ChatModal') {
      if (currentRoute?.params?.chatModalData?._id === data.sender) {
        return;
      }
    }
    try {
      const res = await sendUnreadMessage({
        matchId: data.room,
        message: data.msg,
      });

      console.log('unread res', res);
      useConversations.getState().setConversations(res.data);
    } catch (error) {
      console.log('unread error', error);
    }
  });
};
