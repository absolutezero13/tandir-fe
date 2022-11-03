import React, {useEffect} from 'react';
import {Modal, StyleSheet} from 'react-native';
import Animated, {
  Easing,
  EasingNode,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {Colors, Image, View} from 'react-native-ui-lib';
import {useLoading} from '../zustand';

const tandirImage = require('../assets/images/lahmac.png');

const LahmacLoading = ({small}: {small?: boolean}) => {
  const transform = useSharedValue(0);
  const opacity = useSharedValue(1);
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
  }, []);

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
      <Image
        source={tandirImage}
        resizeMode="contain"
        style={{
          height: 100,
          width: 100,
          borderRadius: 9999,
        }}
      />
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
