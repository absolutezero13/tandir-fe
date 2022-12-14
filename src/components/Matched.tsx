import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Modal} from 'react-native';
import {Colors, Text, View} from 'react-native-ui-lib';

import lahmac from '@assets/images/lahmac.png';
import FastImage from 'react-native-fast-image';
import Animated, {Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';
import {getImages} from 'api/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AppButton from './AppButton';
import {SCREEN_WIDTH} from 'utils/help';
import {IUser} from 'services/types/auth';
import {useCustomNavigation} from 'hooks';

interface Props {
  matchedUser: IUser | null;
  visible: boolean;
  setVisible: (x: boolean) => void;
}

const Matched = ({matchedUser, visible, setVisible}: Props): JSX.Element => {
  const {navigate} = useCustomNavigation();
  const [userImage, setUserImage] = useState('');
  const size = useSharedValue(0);
  const transform = useSharedValue(0);
  const {top} = useSafeAreaInsets();

  useEffect(() => {
    getImages(matchedUser?._id as string).then(res => setUserImage(res[0].imageUrl));
  }, []);

  useEffect(() => {
    transform.value = withRepeat(
      withTiming(360, {
        duration: 300,
        easing: Easing.bounce,
      }),
      3,
    );
    size.value = withRepeat(
      withTiming(300, {
        duration: 300,
        easing: Easing.linear,
      }),
      3,
    );
  }, [transform, size]);

  const goToMatches = () => {
    setVisible(false);
    navigate('Matches');
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: size.value,
      width: size.value,
      alignItems: 'center',
      transform: [
        {
          rotate: `${transform.value}deg`,
        },
      ],
    };
  });
  return (
    <Modal visible={visible} transparent>
      <Animated.View style={[styles.container]}>
        <Pressable onPress={() => setVisible(false)} style={[styles.cross, {top}]}>
          <Icon name="close" color={Colors.accent} size={36} />
        </Pressable>
        <View centerH centerV flex-1>
          <Text biggest accent marginB-20>
            {' '}
            🎉 EŞLEŞME!!! 🎉
          </Text>
          <Animated.View style={animatedStyle}>
            <FastImage source={lahmac} style={{height: '100%', width: '100%'}} />
            <Animated.View style={[animatedStyle, styles.userImage]}>
              <FastImage source={userImage} style={{height: '70%', width: '70%'}} />
            </Animated.View>
          </Animated.View>
          {matchedUser && (
            <Text title accent marginT-30>
              {matchedUser?.username} , {matchedUser?.city}
            </Text>
          )}
          <View marginT-30>
            <AppButton
              onPress={goToMatches}
              text="Eşleşmelere Git"
              color={Colors.secondary}
              width={SCREEN_WIDTH / 1.5}
            />
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    alignItems: 'center',
  },
  image: {height: '100%', width: '100%'},
  userImage: {
    position: 'absolute',
  },
  cross: {
    position: 'absolute',
    right: 10,
  },
});

export default Matched;
