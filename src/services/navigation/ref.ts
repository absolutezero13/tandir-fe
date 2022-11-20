import React from 'react';
import {NavigationContainerRef} from '@react-navigation/native';
import {ScreenProps} from '../../screens';

export const navRef: React.RefObject<NavigationContainerRef<ScreenProps>> = React.createRef();
