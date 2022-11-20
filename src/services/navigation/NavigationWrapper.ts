import React from 'react';
import {NavigationContainerRef, StackActions} from '@react-navigation/native';
import {ScreenProps} from '../../screens';

type Screen = keyof ScreenProps;

export class NavigationWrapper {
  navRef: React.RefObject<NavigationContainerRef<ScreenProps>> = React.createRef();
  inited = false;
  init = async () => {
    if (!this.inited) {
      this.inited = true;
    }
  };

  navigate = (screen: Screen, params?: ScreenProps[Screen]) => {
    this.navRef.current?.navigate(screen, params);
  };

  replace = (screen: Screen, params?: ScreenProps[Screen]) => {
    this.navRef.current?.dispatch(StackActions.replace(screen, params));
  };
}
