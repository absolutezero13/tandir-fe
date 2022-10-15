import {useHeaderHeight} from '@react-navigation/elements';
import {ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from 'react-native-ui-lib';

const useContainerStyle = (): ViewStyle => {
  const headerHeight = useHeaderHeight();
  const {top} = useSafeAreaInsets();

  return {
    paddingTop: headerHeight + top + 24,
    paddingHorizontal: 24,
    backgroundColor: Colors.secondary,
  };
};

export default useContainerStyle;
