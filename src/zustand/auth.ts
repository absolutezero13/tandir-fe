import create from 'zustand';
import {IUser} from '../services/types/auth';

const useAuth = create<IAuth>(set => ({
  jwtToken: '',
  refreshToken: '',
  user: null,
  userImages: [],

  setJwtToken: (jwtToken: string): void => {
    set({jwtToken});
  },
  setRefreshToken: (refreshToken: string): void => {
    set({refreshToken});
  },
  setUser: (user: IUser | null): void => {
    set({user});
  },
  setUserImages: images => {
    set({userImages: images});
  },
}));

interface IAuth {
  jwtToken: string;
  refreshToken: string;
  user: IUser | null;
  userImages: string[];

  setJwtToken: (jwtToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  setUser: (user: IUser | null) => void;
  setUserImages: (images: string[]) => void;
}

export default useAuth;
