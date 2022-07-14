import React from 'react';
import {ImageSourcePropType, Pressable, StyleSheet} from 'react-native';
import {Colors, Image, View} from 'react-native-ui-lib';

interface Props {
  onPress: () => void;
  img: ImageSourcePropType;
}

const FoodCircle = ({img, onPress}: Props) => {
  return (
    <Pressable onPress={onPress}>
      <View backgroundColor={Colors.primary} width={75} height={75} br100 center>
        <Image source={img} style={styles.image} resizeMode="contain" />
      </View>
    </Pressable>
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
