import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {Colors, Text, View} from 'react-native-ui-lib';
import LahmacLoading from '../components/LahmacLoading';
import {useServices} from '../services';

const Splash = () => {
  const opacity = useSharedValue(0);
  const transform = useSharedValue(0);
  const {nav} = useServices();

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 2000,
    });

    setTimeout(() => {
      nav.replace('Login');
    }, 2000);
  }, [opacity, transform, nav]);

  return (
    <View backgroundColor={Colors.secondary} flex-1>
      <Animated.View style={[animatedStyles, styles.container]}>
        <Text marginB-24 white style={styles.title}>
          TANDIR
        </Text>
        <LahmacLoading />
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
