import {AxiosRequestHeaders} from 'axios';
import {Dimensions} from 'react-native';
import RNRestart from 'react-native-restart';
import {IUser} from '../services/types/auth';
import {useAuth} from '../zustand';

export const restartApp = RNRestart.Restart;
export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen');

export const initialValues: IUser = {
  username: '',
  password: '',
  confirmPassword: '',
  email: '',
  phoneNumber: '',
  birthDate: '',
  likes: [],
  matches: [],
  description: '',
  pictures: [],
  role: 'user',
  gender: 'male',
  createdAt: Date.now().toLocaleString(),
  city: '',
  county: '',
  geometry: {
    type: '',
    geometry: [0, 0],
  },
};

export const defaultUserValues = {
  pictures: [],
  matches: [],
  likes: [],
  role: 'user',
  createdAt: new Date().toISOString(),
};

export const mockMessages = [
  {
    order: 0,
    text: 'naber yia ne zaman anaaaa lahmaç yiyoruz?',
    isSelf: false,
  },
  {
    order: 1,
    text: 'allah bilir...',
    isSelf: true,
  },
  {
    order: 2,
    text: 'ne demek istiyosun yav..',
    isSelf: false,
  },
  {
    order: 3,
    text: 'aŞŞşŞşşŞş',
    isSelf: true,
  },
  {
    order: 4,
    text: 'tatava yapma!...',
    isSelf: true,
  },

  {
    order: 5,
    text: 'naber yia ne zaman anaaaa lahmaç yiyoruz?',
    isSelf: false,
  },
  {
    order: 6,
    text: 'allah bilir...',
    isSelf: true,
  },
  {
    order: 7,
    text: 'ne demek istiyosun yav..',
    isSelf: false,
  },
  {
    order: 8,
    text: 'aŞŞşŞşşŞş',
    isSelf: true,
  },
  {
    order: 9,
    text: 'tatava yapma!...',
    isSelf: true,
  },
  {
    order: 10,
    text: 'naber yia ne zaman anaaaa lahmaç yiyoruz?',
    isSelf: false,
  },
  {
    order: 11,
    text: 'allah bilir...',
    isSelf: true,
  },
  {
    order: 12,
    text: 'ne demek istiyosun yav..',
    isSelf: false,
  },
  {
    order: 13,
    text: 'aŞŞşŞşşŞş',
    isSelf: true,
  },
  {
    order: 14,
    text: 'tatava yapma!...',
    isSelf: true,
  },
];

export const getHeadersWithJwt = (): {headers: AxiosRequestHeaders} => {
  return {
    headers: {
      Authorization: `Bearer ${useAuth.getState().jwtToken}`,
    },
  };
};
