import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {Colors, Image, Text, View} from 'react-native-ui-lib';
import {useServices} from '../services';

const tandirImage = require('../assets/images/tandir.png');

const Splash = () => {
  const opacity = useSharedValue(0);
  const transform = useSharedValue(0);
  const {nav} = useServices();

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const lahmacStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateY: transform.value}],
    };
  });

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 2000,
    });

    const clear = setInterval(() => {
      console.log('interval');
      if (transform.value === 0) {
        transform.value = withTiming(50, {
          duration: 500,
        });
      } else {
        transform.value = withTiming(0, {
          duration: 500,
        });
      }
    }, 500);

    setTimeout(() => {
      clearInterval(clear);
      nav.push('Login');
    }, 2000);
  }, [opacity, transform, nav]);

  return (
    <View backgroundColor={Colors.primary} flex-1>
      <Animated.View style={[animatedStyles, styles.container]}>
        <Text marginB-24 white style={styles.title}>
          TANDIR
        </Text>
        <Animated.View style={lahmacStyles}>
          <Image source={tandirImage} resizeMode="contain" />
        </Animated.View>
        <Text marginT-50 white>
          Lahmaç ruhunu bul...
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {fontSize: 48, fontWeight: 'bold'},
});

export default Splash;
