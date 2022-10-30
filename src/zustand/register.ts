import create from 'zustand';
import {IUser} from '../services/types/auth';
import {IRegisterStore} from '../services/types/register';

const useRegister = create<IRegisterStore>(set => ({
  registeringUser: null,
  setRegisteringUser: (registeringUser: IUser | null): void => {
    set({registeringUser});
  },
}));

export default useRegister;
