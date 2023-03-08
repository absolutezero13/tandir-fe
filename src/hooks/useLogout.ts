import {useAuth} from 'store';
import {storage} from 'stores/storage';
import useCustomNavigation from './useCustomNavigation';

const useLogout = () => {
  const {replace} = useCustomNavigation();
  const {clearStore} = useAuth();

  const logout = () => {
    storage.delete('tandir-token');
    clearStore();
    replace('Login');
  };

  return logout;
};

export default useLogout;
