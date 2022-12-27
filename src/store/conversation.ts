import {Conversation} from 'services/types/conversation';
import create from 'zustand';

interface IConversationStore {
  conversations: Conversation[];
  setConversations: (conversations: Conversation[]) => void;
}

const useConversations = create<IConversationStore>(set => ({
  conversations: [],
  setConversations: (conversations: Conversation[]) => {
    set({conversations});
  },
}));

export default useConversations;
