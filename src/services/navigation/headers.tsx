import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Pressable} from 'react-native';
import {ScreenStackHeaderConfigProps} from 'react-native-screens';
import {Colors} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Ionicons';
import {useServices} from '..';

export const TandirHeader = ({title}): BottomTabNavigationOptions => {
  const {nav} = useServices();
  return {
    title,
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: Colors.accent,
    },
    headerStyle: {
      backgroundColor: Colors.secondary,
    },
    headerShadowVisible: false,
    headerLeft: () => (
      <Pressable onPress={nav.pop}>
        <Icon name="arrow-back-outline" size={30} color={Colors.accent} style={{marginLeft: 10}} />
      </Pressable>
    ),
  };
};
