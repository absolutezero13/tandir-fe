import {IUser} from './auth';

export interface IRegisterStore {
  registeringUser: IUser | null;
  setRegisteringUser: (user: IUser | null) => void;
}
