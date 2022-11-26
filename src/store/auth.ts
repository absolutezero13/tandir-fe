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
  clearStore: () => {
    set({
      jwtToken: '',
      refreshToken: '',
      user: null,
      userImages: [],
    });
  },
}));

interface IAuth {
  jwtToken: string;
  refreshToken: string;
  user: IUser | null;
  userImages: {imageUrl: string; imageName: string}[];

  setJwtToken: (jwtToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  setUser: (user: IUser | null) => void;
  setUserImages: (images: {imageUrl: string; imageName: string}[]) => void;
  clearStore: () => void;
}

export default useAuth;
