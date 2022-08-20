import axios from 'axios';
import {useAuth, useLoading} from '../../zustand';
import {ILoginResponse, ILoginUser} from '../types/auth';
import {API_URL} from './contants';

export class AuthApi {
  login = async (body: ILoginUser): PVoid => {
    try {
      useLoading.getState().setLoading(true);
      const resp: ILoginResponse = await axios.post(`${API_URL}/users/signin`, body);
      useAuth.getState().setJwtToken(resp.token);
      useAuth.getState().setRefreshToken(resp.refreshToken);
      useAuth.getState().setUser(resp.user);
    } catch (e) {
      console.log(e);
    }
  };
}
