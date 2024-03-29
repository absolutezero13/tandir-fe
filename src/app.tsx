import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {getNavigationTheme, getThemeStatusBarStyle} from './utils/designSystem';
import {useServices} from './services';
import LahmacLoading from './components/LahmacLoading';
import {RootNavigator} from './screens';
import Geolocation from '@react-native-community/geolocation';

Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'whenInUse',
});

export const AppNavigator = (): JSX.Element => {
  useColorScheme();
  const {nav} = useServices();

  return (
    <>
      <StatusBar barStyle={getThemeStatusBarStyle()} />
      <NavigationContainer ref={nav.navRef} theme={getNavigationTheme()}>
        <RootNavigator />
      </NavigationContainer>
      <LahmacLoading />
    </>
  );
};
