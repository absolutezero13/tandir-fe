import {useHeaderHeight} from '@react-navigation/elements';
import {ViewStyle} from 'react-native';
import {Colors} from 'react-native-ui-lib';

const useContainerStyle = (): ViewStyle => {
  const headerHeight = useHeaderHeight();

  return {
    paddingTop: headerHeight + 24,
    paddingHorizontal: 24,
    backgroundColor: Colors.secondary,
  };
};

export default useContainerStyle;
