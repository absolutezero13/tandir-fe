import axios from 'axios';
import {getHeadersWithJwt} from '../utils/help';
import {useAuth} from '../store';
import {ILoginUser, ImageResponse, IUser} from '../services/types/auth';
import {API_URL} from './contants';

export const login = async (body: ILoginUser): PVoid => {
  console.log({body});
  const resp = await axios.post(`${API_URL}/users/signin`, body);
  console.log(resp.data);
  useAuth.getState().setJwtToken(resp.data.data.token);
  useAuth.getState().setRefreshToken(resp.data.data.refreshToken);
  useAuth.getState().setUser(resp.data.data.user);
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
