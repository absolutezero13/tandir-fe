import React, {useEffect} from 'react';
import Animated, {useAnimatedStyle, useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';
import {Image} from 'react-native-ui-lib';

const tandirImage = require('../assets/images/tandir.png');

const LahmacLoading = () => {
  const transform = useSharedValue(0);

  const lahmacStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateY: transform.value}],
    };
  });

  useEffect(() => {
    transform.value = withRepeat(withTiming(50, {duration: 700}), Infinity, true);
  }, [transform]);

  return (
    <Animated.View style={lahmacStyles}>
      <Image source={tandirImage} resizeMode="contain" />
    </Animated.View>
  );
};

export default LahmacLoading;
