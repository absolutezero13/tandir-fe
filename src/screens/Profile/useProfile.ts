// hooks
import {useCustomNavigation} from '@hooks';

// api
import {IUser} from '../../services/types/auth';
import {useAuth} from '@store';
import {storage} from 'stores/storage';

const useProfile = () => {
  const user = useAuth().user as IUser;
  const {navigate, replace} = useCustomNavigation();
  const {userImages, clearStore} = useAuth();

  const navigateToUpdate = () => navigate('UpdatingPhotos', {updating: true});

  const logout = () => {
    storage.delete('tandir-token');
    clearStore();
    replace('Login');
  };

  return {
    user,
    userImages,
    navigateToUpdate,
    logout,
  };
};

export default useProfile;
