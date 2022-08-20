import React, {useEffect} from 'react';
import Animated, {useAnimatedStyle, useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';
import {Colors, Image, Modal, View} from 'react-native-ui-lib';
import {stores} from '../stores';
import {useLoading} from '../zustand';

const tandirImage = require('../assets/images/tandir.png');

const LahmacLoading = ({small}: {small?: boolean}) => {
  const transform = useSharedValue(0);
  const {loading} = useLoading();

  const lahmacStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateY: transform.value}],
      alignItems: 'center',
      justifyContent: 'center',
    };
  });

  useEffect(() => {
    transform.value = withRepeat(withTiming(-100, {duration: 700}), Infinity, true);
  }, [transform]);

  const content = (
    <Animated.View style={lahmacStyles}>
      <Image source={tandirImage} resizeMode="contain" />
    </Animated.View>
  );

  if (small) {
    return content;
  }

  return (
    <Modal visible={loading}>
      <View flex-1 centerV centerH backgroundColor={Colors.primary}>
        {content}
      </View>
    </Modal>
  );
};

export default LahmacLoading;
