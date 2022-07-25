import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Pressable} from 'react-native';
import {Colors} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Ionicons';
import {useServices} from '..';

interface TandirHeaderProps {
  title: string;
  showBackButton?: boolean;
}

export const TandirHeader = ({title, showBackButton}: TandirHeaderProps): BottomTabNavigationOptions => {
  const {nav} = useServices();
  return {
    title,
    headerTitleStyle: {
      fontSize: 24,
      fontFamily: 'ChakraPetch-Bold',
      color: Colors.accent,
    },
    headerStyle: {
      backgroundColor: Colors.secondary,
    },
    headerShadowVisible: false,
    headerLeft: showBackButton
      ? () => (
          <Pressable onPress={nav.pop}>
            <Icon name="arrow-back-outline" size={30} color={Colors.accent} style={{marginLeft: 10}} />
          </Pressable>
        )
      : () => null,
  };
};
