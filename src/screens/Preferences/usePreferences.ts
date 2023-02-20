import {useMemo, useState} from 'react';
import {Alert, Platform} from 'react-native';
import {handleError} from 'utils/help';
import {updateUser} from 'api/auth';
import {useAuth, useLoading} from 'store';
import {IUser, IUserPreferences} from 'services/types/auth';

const usePreferences = () => {
  const {user, setUser} = useAuth();
  const {setLoading} = useLoading();
  const [preferencesFields, setPreferencesFields] = useState(user?.preferences as IUserPreferences);

  const updateUserPreferences = async () => {
    try {
      setLoading(true);

      await updateUser(user?._id as string, {preferences: preferencesFields});
      setUser({...(user as IUser), preferences: preferencesFields});
      Alert.alert('Bilgilerin başarıyla güncellendi.');
    } catch (error: any) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const disabled = useMemo(() => {
    return JSON.stringify(preferencesFields) === JSON.stringify(user?.preferences);
  }, [preferencesFields, user]);

  const markerStyle = useMemo(() => {
    return Platform.select({
      android: {
        backgroundColor: '#fff',
        width: 30,
        height: 30,
        borderRadius: 15,
      },
      ios: undefined,
    });
  }, []);

  return {
    preferencesFields,
    setPreferencesFields,
    updateUserPreferences,
    disabled,
    markerStyle,
  };
};

export default usePreferences;
