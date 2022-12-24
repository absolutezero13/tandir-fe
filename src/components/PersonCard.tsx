import React, {useEffect, useState} from 'react';
import {Animated, GestureResponderEvent, Pressable, StyleSheet} from 'react-native';
import {Colors, Image, Text, View} from 'react-native-ui-lib';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import {getAgeFromBD, SCREEN_WIDTH} from 'utils/help';
import {Shadows} from 'utils/designSystem';
import {IUser} from 'services/types/auth';
import {getImages} from 'api/auth';
import halukDislike from '../assets/images/haluk-dislike.png';
import haluk from '../assets/images/haluk.png';

interface Props {
  person: IUser;
  swipe: any;
  isFirst: boolean;
  isLiking: any;
}
const CARD_WIDTH = SCREEN_WIDTH - 48;

const PersonCard = ({person, swipe, isFirst, isLiking, ...rest}: Props) => {
  const [personImages, setPersonImages] = useState<{imageUrl: string}[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    getImages(person?._id as string).then(imgs => setPersonImages(imgs));
  }, []);

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

  const likeOrDislikeImageStyles = {
    marginTop: 40,
    position: 'absolute',
    borderRadius: 300,
    width: '100%',
    alignItems: 'center',
    opacity: swipe.x.interpolate({
      inputRange: [-CARD_WIDTH / 4, 0, CARD_WIDTH / 4],
      outputRange: [1, 0, 1],
    }),
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
          {!(personImages.length > 0) && (
            <Image
              source={{uri: 'https://picsum.photos/200/300?random=1'}}
              style={styles.cardImage}
              resizeMode="contain"
            />
          )}
          {isFirst && (
            <Animated.View style={likeOrDislikeImageStyles}>
              <Image source={isLiking ? haluk : halukDislike} style={styles.likeOrDislikeImage} />
              <Text title accent marginT-20>
                {isLiking ? 'BEĞEN!' : 'IYYYYY!'}
              </Text>
            </Animated.View>
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
          <View row centerV>
            <Text primary medium>
              {person.username} , {getAgeFromBD(person.birthDate)}
            </Text>
            <Icon style={{marginLeft: 5}} name={person.gender} color={Colors.primary} />
          </View>
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
  likeOrDislikeImage: {
    borderRadius: 300,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
});

export default PersonCard;
