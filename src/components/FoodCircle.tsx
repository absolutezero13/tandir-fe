import React from 'react';
import {ImageSourcePropType, StyleSheet} from 'react-native';
import {Colors, Image, Text, View} from 'react-native-ui-lib';
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
        <Image source={img} style={styles.image} resizeMode="contain" />
        <Text white style={{fontSize: 8}}>
          {text}
        </Text>
      </View>
    </Bounceable>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 15,
  },
});

export default FoodCircle;
