import {io} from 'socket.io-client';
import {sendUnreadMessage} from 'api/conversation';
import {Conversation} from 'services/types/conversation';
import useConversations from 'store/conversation';
import {API_URL} from 'api/contants';
import {services} from 'services';

export const socket = io(API_URL as string);

export const SOCKET_CONTANTS = {
  JOIN_ROOM: 'join-room',
  RECEIVE_MESSAGE: 'receive-message',
  IS_WRITING: 'is-writing',
  IS_NOT_WRITING: 'is-not-writing',
};

export const initSockets = (conversations: Conversation[]) => {
  conversations.forEach(conversation => {
    socket.emit(SOCKET_CONTANTS.JOIN_ROOM, conversation.matchId);
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
      useConversations.getState().setConversations(res.data);
    } catch (error) {
      console.log('unread error', error);
    }
  });
};

export const removeSocketEvents = (evetName: string[] | string) => {
  if (Array.isArray(evetName)) {
    evetName.forEach(event => {
      socket.off(event);
    });
  } else {
    socket.off(evetName);
  }
};
