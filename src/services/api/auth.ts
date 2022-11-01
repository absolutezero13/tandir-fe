import axios from 'axios';
import {useAuth} from '../../zustand';
import {ILoginUser, IUser} from '../types/auth';
import {API_URL} from './contants';

export class AuthApi {
  login = async (body: ILoginUser): PVoid => {
    console.log({body});
    const resp = await axios.post(`${API_URL}/users/signin`, body);
    console.log(resp.data);
    useAuth.getState().setJwtToken(resp.data.data.token);
    useAuth.getState().setRefreshToken(resp.data.data.refreshToken);
    useAuth.getState().setUser(resp.data.data.user);
  };

  register = async (body: IUser): Promise<IUser> => {
    const resp: any = await axios.post(`${API_URL}/users/signup`, body);
    useAuth.getState().setUser(resp.data.data);
    console.log('register res', resp.data);
    return resp.data.data;
  };

  uploadImages = async (body: FormData, userId: string) => {
    const res = await axios.post(`${API_URL}/users/${userId}/images`, body);
    return res;
  };

  getImages = async (userId: string) => {
    const res = await axios.get(`${API_URL}/users/${userId}/images`);
    return res.data.images;
  };

  isUnique = async (body: {fieldName: string; value: any}): Promise<{isUnique: boolean}> => {
    const res = await axios.post(`${API_URL}/users/isUnique`, body);

    return res.data;
  };
}
