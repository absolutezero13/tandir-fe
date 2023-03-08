// hooks
import {useCustomNavigation, useLogout} from '@hooks';

// api
import {IUser} from '../../services/types/auth';
import {useAuth} from '@store';

const useProfile = () => {
  const user = useAuth().user as IUser;
  const {navigate} = useCustomNavigation();
  const {userImages} = useAuth();
  const logout = useLogout();

  const navigateToUpdate = () => navigate('UpdatingPhotos', {updating: true});

  return {
    user,
    userImages,
    navigateToUpdate,
    logout,
  };
};

export default useProfile;
