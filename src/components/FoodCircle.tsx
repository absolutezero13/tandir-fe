import React from 'react';
import {ImageSourcePropType, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Colors, Text, View} from 'react-native-ui-lib';
import {Bounceable} from 'rn-bounceable';
import {Shadows} from '../utils/designSystem';

interface Props {
  onPress: () => void;
  img: ImageSourcePropType;
  text: string;
}

const FoodCircle = ({img, text, onPress}: Props) => {
  return (
    <Bounceable onPress={onPress}>
      <View style={Shadows.dark} backgroundColor={Colors.primary} width={90} height={90} br100 center>
        <FastImage source={img} style={styles.image} resizeMode="contain" />
        <Text white style={styles.text}>
          {text}
        </Text>
      </View>
    </Bounceable>
  );
};

const styles = StyleSheet.create({
  text: {fontSize: 8},
  image: {
    width: 50,
    height: 50,
    borderRadius: 15,
  },
});

export default FoodCircle;
