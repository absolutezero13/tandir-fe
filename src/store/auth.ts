import create from 'zustand';
import {IUser} from '../services/types/auth';

export const initialUserObject = {
  _id: '',
  username: '',
  email: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
  gender: '', // temporary,
  birthDate: '',
  birthDateInMs: 0,
  description: '',
  pictures: [],
  matches: [],
  likes: [],
  dislikes: [],
  role: '',
  createdAt: '',
  city: '',
  county: '',
  geometry: {
    type: '',
    coordinates: [0, 0],
  },
  preferences: {
    distance: 0,
    gender: '',
    ages: {
      max: 0,
      min: 0,
    },
  },
};

const useAuth = create<IAuth>(set => ({
  jwtToken: '',
  refreshToken: '',
  user: initialUserObject,
  userImages: [],

  setJwtToken: (jwtToken: string): void => {
    set({jwtToken});
  },
  setRefreshToken: (refreshToken: string): void => {
    set({refreshToken});
  },
  setUser: (user: IUser): void => {
    set({user});
  },
  setUserImages: images => {
    set({userImages: images});
  },
  clearStore: () => {
    set({
      jwtToken: '',
      refreshToken: '',
      user: initialUserObject,
      userImages: [],
    });
  },
}));

interface IAuth {
  jwtToken: string;
  refreshToken: string;
  user: IUser;
  userImages: {imageUrl: string; imageName: string}[];

  setJwtToken: (jwtToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  setUser: (user: IUser) => void;
  setUserImages: (images: {imageUrl: string; imageName: string}[]) => void;
  clearStore: () => void;
}

export default useAuth;
