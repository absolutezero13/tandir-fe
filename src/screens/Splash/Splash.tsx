import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {LahmacLoading} from '@components';
import {useCustomNavigation} from '@hooks';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {Colors, Text, View} from 'react-native-ui-lib';

const Splash = () => {
  const opacity = useSharedValue(0);
  const transform = useSharedValue(0);
  const {replace} = useCustomNavigation();

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
      replace('Login');
    }, 2000);
  }, [opacity, transform, replace]);

  return (
    <View backgroundColor={Colors.secondary} flex-1>
      <Animated.View style={[animatedStyles, styles.container]}>
        <Text marginB-24 white bold style={styles.title}>
          TANDIR
        </Text>
        <LahmacLoading small />
        <Text marginT-50 white medium>
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
  title: {fontSize: 48},
});

export default Splash;
