import React, {useEffect, useState} from 'react';
import {Animated, GestureResponderEvent, Pressable, StyleSheet} from 'react-native';
import {Colors, Image, Text, View} from 'react-native-ui-lib';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import {getAgeFromBD, SCREEN_WIDTH} from 'utils/help';
import {Shadows} from 'utils/designSystem';
import {IUser} from 'services/types/auth';
import {getImages} from 'api/auth';

interface Props {
  person: IUser;
  swipe: any;
  isFirst: boolean;
}
const CARD_WIDTH = SCREEN_WIDTH - 48;
const PersonCard = ({person, swipe, isFirst, ...rest}: Props) => {
  const [personImages, setPersonImages] = useState<{imageUrl: string}[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    getImages(person?._id as string).then(imgs => setPersonImages(imgs));
  }, []);

  console.log('person images', personImages[0]);

  const animatedPersonStyle = {
    transform: [
      ...swipe.getTranslateTransform(),
      {
        rotate: swipe.x.interpolate({
          inputRange: [CARD_WIDTH / -2, 0, CARD_WIDTH / 2],
          outputRange: ['8deg', '0deg', '-8deg'],
        }),
      },
    ],
  };

  const onImagePress = (event: GestureResponderEvent) => {
    if (event.nativeEvent.locationX >= CARD_WIDTH / 2) {
      setActiveIndex(prev => (prev === personImages.length - 1 ? personImages.length - 1 : prev + 1));
    } else {
      setActiveIndex(prev => (prev === 0 ? 0 : prev - 1));
    }
  };

  return (
    <Animated.View {...rest} style={[styles.card, {width: CARD_WIDTH}, isFirst && animatedPersonStyle]}>
      <View style={styles.cardContent}>
        <Pressable style={styles.cardImage} onPress={onImagePress}>
          {personImages.length > 0 && (
            <FastImage source={{uri: personImages[activeIndex].imageUrl}} style={styles.cardImage} />
          )}
        </Pressable>
        {personImages.length > 1 && (
          <View spread row centerV width={SCREEN_WIDTH - 64} marginH-8 marginT-8>
            {personImages.map((img, index, all) => (
              <View
                key={img.imageUrl}
                width={`${100 / all.length - 2}%`}
                backgroundColor={activeIndex === index ? Colors.primary : 'rgba(0,0,0,0.2)'}
                style={styles.imageDots}
              />
            ))}
          </View>
        )}
        <View marginT-12 paddingH-10>
          <Text primary medium>
            {person.username} , {getAgeFromBD(person.birthDate)}
          </Text>
          <View row centerV>
            <Icon name="location" />
            <Text small>
              {person.city} , {person.county}
            </Text>
          </View>
          <Text marginT-12 small>
            Özet:
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
  imageDots: {
    height: 3,
    borderRadius: 10,
  },
});

export default PersonCard;
