import React, {useEffect, useState} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {Image, Text, View} from 'react-native-ui-lib';
import {SCREEN_WIDTH} from 'utils/help';
import {Shadows} from 'utils/designSystem';
import {IUser} from 'services/types/auth';
import {getImages} from 'api/auth';

interface Props {
  person: IUser;
  swipe: any;
  isFirst: boolean;
}

const PersonCard = ({person, swipe, isFirst, ...rest}: Props) => {
  const [personImages, setPersonImages] = useState<any>([]);

  useEffect(() => {
    getImages(person?._id as string).then(imgs => setPersonImages(imgs));
  }, []);

  console.log('person images', personImages[0]);

  const animatedPersonStyle = {
    transform: [
      ...swipe.getTranslateTransform(),
      {
        rotate: swipe.x.interpolate({
          inputRange: [(SCREEN_WIDTH - 48) / -2, 0, (SCREEN_WIDTH - 48) / 2],
          outputRange: ['8deg', '0deg', '-8deg'],
        }),
      },
    ],
  };

  return (
    <Animated.View {...rest} style={[styles.card, {width: SCREEN_WIDTH - 48}, isFirst && animatedPersonStyle]}>
      <View style={styles.cardContent}>
        <View style={styles.cardImage}>
          {personImages.length > 0 && <Image source={{uri: personImages[0].imageUrl}} style={styles.cardImage} />}
        </View>
        <View style={styles.cardText}>
          <Text yellow10 small>
            {person.username} , {person.birthDate}
          </Text>
          <Text>{person.description}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    ...Shadows.light,
    borderRadius: 10,
    height: 500,
    alignSelf: 'center',
    borderColor: 'black',
    backgroundColor: '#fff',
    position: 'absolute',
  },
  cardContent: {
    flex: 1,
  },
  cardImage: {
    width: SCREEN_WIDTH - 48,
    height: SCREEN_WIDTH - 48,
    borderRadius: 10,
  },
  cardText: {
    padding: 10,
  },
});

export default PersonCard;
