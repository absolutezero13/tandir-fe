import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {Colors, Image, Text} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAuth} from 'store';
import FastImage from 'react-native-fast-image';
import {Shadows} from 'utils/designSystem';

interface TandirHeaderProps {
  title: string;
  showBackButton?: boolean;
}

export const TandirHeader = ({
  title,
  showBackButton,
}: TandirHeaderProps): BottomTabNavigationOptions | NativeStackNavigationOptions => {
  const navigation = useNavigation();
  const {user, userImages} = useAuth();

  return {
    title,
    headerTitleStyle: {
      fontSize: 24,
      fontFamily: 'ChakraPetch-Bold',
      color: Colors.accent,
    },
    headerStyle: {
      backgroundColor: Colors.secondary,
      ...Shadows.header,
    },
    headerShadowVisible: true,
    headerRight: user
      ? () => (
          <Pressable style={styles.pressable} onPress={() => navigation.navigate('Profile')}>
            <Text white bold accent marginR-6 small>
              {user.username}
            </Text>
            <FastImage source={{uri: userImages[0]?.imageUrl}} style={styles.image} />
          </Pressable>
        )
      : () => null,
    headerLeft: showBackButton
      ? () => (
          <Pressable onPress={navigation.goBack}>
            <Icon name="arrow-back-outline" size={30} color={Colors.accent} style={styles.icon} />
          </Pressable>
        )
      : () => null,
  };
};

const styles = StyleSheet.create({
  pressable: {flexDirection: 'row', marginRight: 10},
  image: {height: 20, width: 20, borderRadius: 40},
  icon: {marginLeft: 10},
});
