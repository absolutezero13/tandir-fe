import RNRestart from 'react-native-restart';
import {IUser} from '../services/types/auth';

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
