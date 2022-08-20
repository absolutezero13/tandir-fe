import create from 'zustand';
import {IUser} from '../services/types/auth';

const useAuth = create<IAuth>(set => ({
  jwtToken: '',
  refreshToken: '',
  user: null,

  setJwtToken: (jwtToken: string): void => {
    set({jwtToken});
  },
  setRefreshToken: (refreshToken: string): void => {
    set({refreshToken});
  },
  setUser: (user: IUser | null): void => {
    set({user});
  },
}));

interface IAuth {
  jwtToken: string;
  refreshToken: string;
  user: IUser | null;

  setJwtToken: (jwtToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  setUser: (user: IUser | null) => void;
}

export default useAuth;
