import {Alert} from 'react-native';
import RNRestart from 'react-native-restart';
import {IUser} from '../services/types/auth';
import {useLoading} from '../zustand';

export const randomNum = (max = 100): number => Math.floor(Math.random() * max);

export const restartApp = RNRestart.Restart;

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
