import axios from 'axios';
import {getHeadersWithJwt} from 'utils/help';
import {useAuth} from '../store';
import {ILoginUser, ImageResponse, IUser} from '../services/types/auth';
import {API_URL} from './contants';
import {storage} from 'stores/storage';

const setUserInfo = (resp, isAuto = false) => {
  if (!isAuto) {
    useAuth.getState().setJwtToken(resp.data.data.token);
    useAuth.getState().setRefreshToken(resp.data.data.refreshToken);
  }
  useAuth.getState().setUser(resp.data.data.user);
};

export const login = async (body: ILoginUser): PVoid => {
  console.log({body});
  const resp = await axios.post(`${API_URL}/users/signin`, body);
  console.log(resp.data);
  setUserInfo(resp);
  storage.set('tandir-token', resp.data.data.token);
};

export const signInWithToken = async (): PVoid => {
  const token = storage.getString('tandir-token');
  const resp = await axios.post(
    `${API_URL}/users/signin-with-token`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  console.log('sign in with token', resp.data);
  setUserInfo(resp, true);
  return resp.data;
};

export const register = async (body: IUser): Promise<IUser> => {
  const resp = await axios.post(`${API_URL}/users/signup`, body);
  useAuth.getState().setUser(resp.data.data);
  return resp.data.data;
};

export const getUser = async (userId: string): Promise<IUser> => {
  const res = await axios.get(`${API_URL}/users/${userId}`, getHeadersWithJwt());
  return res.data.data;
};

export const getAllUsers = async (): Promise<IUser[]> => {
  const res = await axios.get(`${API_URL}/users`, getHeadersWithJwt());
  return res.data.data;
};

export const updateUser = async (userId: string, fields: any) => {
  const res = await axios.post(`${API_URL}/users/${userId}`, fields, getHeadersWithJwt());
  return res.data.data;
};

export const uploadImages = async (body: FormData, userId: string) => {
  const res = await axios.post(`${API_URL}/users/${userId}/images`, body, getHeadersWithJwt());
  return res;
};

export const getImages = async (userId: string): Promise<ImageResponse[]> => {
  const res = await axios.get(`${API_URL}/users/${userId}/images`, getHeadersWithJwt());
  return res.data.images;
};

export const deleteImage = async (userId: string, imageName: string) => {
  const res = await axios.delete(`${API_URL}/users/${userId}/images/${imageName}`, getHeadersWithJwt());
  return res;
};

export const isUnique = async (body: {fieldName: string; value: any}): Promise<{isUnique: boolean}> => {
  const res = await axios.post(`${API_URL}/users/isUnique`, body);
  return res.data;
};

export const autoLogin = async () => {
  const token = storage.getString('tandir-token');
  // const refreshToken = storage.getString('tandir-refresh-token');

  if (!token) {
    return false;
  }
  try {
    useAuth.getState().setJwtToken(token);
    await signInWithToken();

    return true;
  } catch (error) {
    return false;
  }
};
