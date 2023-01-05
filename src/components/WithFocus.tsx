import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

interface Props {
  children: JSX.Element;
  onFocus?: () => void;
  onBlur?: () => void;
}

const WithFocus = ({children, onFocus, onBlur}: Props) => {
  const navigation = useNavigation();

  useEffect(() => {
    if (onFocus) {
      navigation.addListener('focus', onFocus);
    }
    if (onBlur) {
      navigation.addListener('blur', onBlur);
    }
    return () => {
      if (onFocus) {
        navigation.removeListener('focus', onFocus);
      }
      if (onBlur) {
        navigation.removeListener('blur', onBlur);
      }
    };
  }, [navigation, onFocus, onBlur]);

  return children;
};

export default WithFocus;
