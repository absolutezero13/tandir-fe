import axios from 'axios';
import {tryCatch} from '../../utils/help';
import {useAuth, useLoading} from '../../zustand';
import {ILoginUser, IUser} from '../types/auth';
import {API_URL} from './contants';

export class AuthApi {
  login = async (body: ILoginUser): PVoid => {
    useLoading.getState().setLoading(true);
    console.log({body});
    const resp = await axios.post(`${API_URL}/users/signin`, body);
    console.log(resp.data);
    useAuth.getState().setJwtToken(resp.data.data.token);
    useAuth.getState().setRefreshToken(resp.data.data.refreshToken);
    useAuth.getState().setUser(resp.data.data.user);
  };

  register = tryCatch(async (body: IUser): PVoid => {
    const resp: any = await axios.post(`${API_URL}/users/signup`, body);
    useAuth.getState().setJwtToken(resp.token);
    useAuth.getState().setRefreshToken(resp.refreshToken);
    useAuth.getState().setUser(resp.user);
  });
}
