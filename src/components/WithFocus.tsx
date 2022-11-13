import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

interface Props {
  children: JSX.Element;
  onFocus: () => void;
}

const WithFocus = ({children, onFocus}: Props) => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener('focus', onFocus);
    return () => navigation.removeListener('focus', onFocus);
  }, [navigation, onFocus]);

  return children;
};

export default WithFocus;
