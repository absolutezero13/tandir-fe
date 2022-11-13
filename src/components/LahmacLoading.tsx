import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';
import {Image, View} from 'react-native-ui-lib';
import {useLoading} from '../zustand';

const tandirImage = require('../assets/images/lahmac.png');

const LahmacLoading = ({small}: {small?: boolean}) => {
  const transform = useSharedValue(0);
  const {loading} = useLoading();

  // First set up animation
  useEffect(() => {
    transform.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      Infinity,
    );
  }, [transform]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: 100,
      width: 100,
      transform: [
        {
          rotate: `${transform.value}deg`,
        },
      ],
    };
  });

  const content = (
    <Animated.View style={animatedStyle}>
      <Image source={tandirImage} resizeMode="contain" style={styles.image} />
    </Animated.View>
  );

  if (small) {
    return content;
  }

  if (!loading) {
    return null;
  }

  return (
    <View style={StyleSheet.absoluteFillObject} backgroundColor="rgba(0,0,0,0.5)">
      <View flex-1 centerV centerH>
        {content}
      </View>
    </View>
  );
};

export default LahmacLoading;

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
    borderRadius: 9999,
  },
});
