import axios from 'axios';
import {Conversation, Message} from 'services/types/conversation';
import {getHeadersWithJwt} from 'utils/help';
import {API_URL} from './contants';

export const createConversation = async (body: {matchId: string}) => {
  const resp = await axios.post(`${API_URL}/conversation`, body, getHeadersWithJwt());
  return resp.data;
};

export const getConversation = async (body: {matchId: string}): Promise<{data: Conversation}> => {
  console.log(`${API_URL}/conversation/${body.matchId}`);
  const resp = await axios.get(`${API_URL}/conversation/${body.matchId}`, getHeadersWithJwt());
  return resp.data;
};

export const sendMessage = async (body: {matchId: string; message: Message}) => {
  const resp = await axios.post(`${API_URL}/conversation/message`, body, getHeadersWithJwt());
  return resp.data;
};
