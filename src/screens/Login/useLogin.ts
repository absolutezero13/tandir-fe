import {useState} from 'react';
import {useCustomNavigation, useKeyboard} from 'hooks';
import {useLoading} from 'store';
import {authApi} from '@api';
import {handleError} from '../../utils/help';
import haluk from '@assets/images/haluk.png';

const useLogin = () => {
  const {setLoading} = useLoading();
  const {keyboardOpen} = useKeyboard();
  const {navigate, replace} = useCustomNavigation();

  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [imageSource, setImageSource] = useState(haluk);

  const goToRegisterPage = () => {
    navigate('Register');
  };

  const login = async () => {
    try {
      setLoading(true);
      await authApi.login({username, password});
      replace('Tabs');
    } catch (e: any) {
      handleError(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    username,
    setusername,
    password,
    setPassword,
    imageSource,
    setImageSource,
    goToRegisterPage,
    login,
    keyboardOpen,
  };
};

export default useLogin;
