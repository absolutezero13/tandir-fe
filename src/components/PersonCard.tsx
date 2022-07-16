import React from 'react';
import {Animated, ImageSourcePropType, StyleSheet} from 'react-native';
import {Image, Text, View} from 'react-native-ui-lib';
import {useConstants} from '../utils/constants';
import {Shadows} from '../utils/designSystem';

interface Props {
  person: {
    name: string;
    age: string;
    img: ImageSourcePropType;
    desc: string;
  };
  swipe: any;
  isFirst: boolean;
}

const PersonCard = ({person, swipe, isFirst, ...rest}: Props) => {
  const {dim} = useConstants();

  const animatedPersonStyle = {
    transform: [
      ...swipe.getTranslateTransform(),
      {
        rotate: swipe.x.interpolate({
          inputRange: [(dim.width - 48) / -2, 0, (dim.width - 48) / 2],
          outputRange: ['8deg', '0deg', '-8deg'],
        }),
      },
    ],
  };

  return (
    <Animated.View {...rest} style={[styles.card, {width: dim.width - 48}, isFirst && animatedPersonStyle]}>
      <View style={styles.cardContent}>
        <View style={styles.cardImage}>
          <Image source={person.img} style={styles.cardImage} resizeMode="contain" />
        </View>
        <View style={styles.cardText}>
          <Text white small>
            {person.name} , {person.age}
          </Text>
          <Text>{person.desc}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    ...Shadows.dark,
    borderRadius: 10,
    height: 500,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#fff',
    position: 'absolute',
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  cardText: {
    flex: 1,
    padding: 10,
  },
});

export default PersonCard;
