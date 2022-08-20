import React from 'react';
import {Platform} from 'react-native';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {Colors} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Ionicons';

import {getHeaderBlurEffect} from '../../utils/designSystem';

export const screenDefaultOptions = (): NativeStackNavigationOptions => ({
  headerShadowVisible: false,
  headerTintColor: Colors.primary,

  // this setup makes large title work on iOS
  ...Platform.select({
    ios: {
      headerLargeTitle: true,
      headerTransparent: true,
      headerBlurEffect: getHeaderBlurEffect(),
    },
  }),
});

export const tabBarDefaultOptions = (routeName: string): BottomTabNavigationOptions => ({
  // headerShown: false,
  tabBarActiveTintColor: Colors.accent,
  tabBarInactiveTintColor: Colors.grey40,
  tabBarStyle: {backgroundColor: Colors.primary, borderTopWidth: 0, elevation: 0, height: 90},
  tabBarLabelStyle: {
    fontFamily: 'ChakraPetch-Medium',
    fontSize: 12,
  },
  tabBarIcon: ({focused, color}) => <Icon name={getIconName(routeName, focused)} size={30} color={color} />,
});

const getIconName = (routeName: string, focused: boolean): string => {
  if (routeName === 'Matches') {
    return focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline';
  }
  if (routeName === 'Profile') {
    return focused ? 'person' : 'person-outline';
  }
  if (routeName === 'Main') {
    return focused ? 'fitness' : 'fitness-outline';
  }

  return 'list';
};
