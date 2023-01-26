import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Modal} from 'react-native';

import {Colors, Text, View} from 'react-native-ui-lib';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';

import AppButton from './AppButton';
import {getImages} from 'api/auth';
import {SCREEN_WIDTH} from 'utils/help';
import {IUser} from 'services/types/auth';
import {useCustomNavigation} from 'hooks';
import lahmac from '@assets/images/lahmac.png';

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
    getImages(matchedUser?._id as string).then(res => setUserImage(res[0]?.imageUrl));
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
            🎉 EŞLEŞME!!! 🎉
          </Text>
          <View height={300}>
            <Animated.View style={animatedStyle}>
              <FastImage source={lahmac} style={styles.lahmacImage} />
              <Animated.View style={[animatedStyle, styles.userImage]}>
                {userImage ? <FastImage source={userImage} style={styles.userImageSize} /> : null}
              </Animated.View>
            </Animated.View>
          </View>
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
  image: {
    height: '100%',
    width: '100%',
  },
  lahmacImage: {
    height: '100%',
    width: '100%',
  },
  userImage: {
    position: 'absolute',
  },
  userImageSize: {
    height: '70%',
    width: '70%',
  },
  cross: {
    position: 'absolute',
    right: 10,
  },
});

export default Matched;
