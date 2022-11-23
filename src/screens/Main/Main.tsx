import React, {useCallback, useEffect, useRef, useState} from 'react';

// elements
import {Animated, PanResponder} from 'react-native';
import {Colors, View} from 'react-native-ui-lib';

// components
import Circles from './components/Circles';
import People from './components/People';

// services
import {getAllUsers} from 'api/auth';

// utils
import {SCREEN_WIDTH} from 'utils/help';
import {IUser} from 'services/types/auth';

const foods = [
  {
    text: 'Lahmacun',
    img: require('../../assets/images/tandir.png'),
  },
  {
    text: 'Pide',
    img: require('../../assets/images/kiymali.png'),
  },
  {
    text: 'Tandır',
    img: require('../../assets/images/actualTandir.png'),
  },
];

const Main = () => {
  const [people, setPeople] = useState<IUser[]>([]);

  const swipe = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    getAllUsers().then(users => setPeople(users));
  }, []);

  const removePerson = useCallback(() => {
    setPeople(prev => {
      return prev.slice(0, -1);
    });
    swipe.setValue({x: 0, y: 0});
  }, [swipe]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, {dx, dy}) => {
      swipe.setValue({x: dx, y: dy});
    },
    onPanResponderRelease: (_, gestureState) => {
      const direction = Math.sign(gestureState.dx);
      const directionVal = direction < 0 ? -1 : 1;
      if (gestureState.dx > 100 || gestureState.dx < -100) {
        Animated.spring(swipe, {
          toValue: {x: directionVal * (SCREEN_WIDTH + 100), y: 0},
          useNativeDriver: true,
        }).start();
        setTimeout(removePerson, 200);
      } else {
        Animated.spring(swipe, {
          toValue: {x: 0, y: 0},
          friction: 5,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  return (
    <View flex-1 backgroundColor={Colors.secondary}>
      <View paddingT-12>
        <Circles foods={foods} />
      </View>
      <People people={people} panResponder={panResponder} swipe={swipe} />
    </View>
  );
};

export default Main;
