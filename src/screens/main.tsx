import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Dimensions, StyleSheet, Animated, PanResponder} from 'react-native';
import {Colors, Image, Text, View} from 'react-native-ui-lib';
import FoodCircle from '../components/FoodCircle';
import PersonCard from '../components/PersonCard';
import {useConstants} from '../utils/constants';

const foods = [
  {
    text: 'Lahmacun',
    img: require('../assets/images/tandir.png'),
  },
  {
    text: 'Pide',
    img: require('../assets/images/kiymali.png'),
  },
  {
    text: 'Tandır',
    img: require('../assets/images/actualTandir.png'),
  },
];

const peopleData = [
  {
    name: 'Ali',
    age: '25',
    img: require('../assets/images/person1.jpeg'),
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    name: 'Veli',
    age: '25',
    img: require('../assets/images/person2.jpeg'),
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    name: 'Mehmet',
    age: '25',
    img: require('../assets/images/person3.jpeg'),

    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    name: 'Ali',
    age: '25',
    img: require('../assets/images/person4.jpeg'),
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
];

const Main = () => {
  const [people, setPeople] = useState(peopleData);
  const {
    dim: {width: SCREEN_WIDTH},
  } = useConstants();

  const swipe = useRef(new Animated.ValueXY()).current;

  const removePerson = useCallback(() => {
    setPeople(prev => {
      return prev.slice(0, -1);
    });
    swipe.setValue({x: 0, y: 0});
  }, [swipe]);

  useEffect(() => {
    if (people.length === 0) {
      setPeople(peopleData);
    }
  }, [people]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, {dx, dy}) => {
      swipe.setValue({x: dx, y: dy});
    },
    onPanResponderRelease: (event, gestureState) => {
      const direction = Math.sign(gestureState.dx);
      console.log('dx', gestureState.dx);
      if (gestureState.dx > 100 || gestureState.dx < -100) {
        Animated.spring(swipe, {
          toValue: {x: direction * (SCREEN_WIDTH + 100), y: 0},
          useNativeDriver: true,
        }).start(() => removePerson());
      } else {
        Animated.spring(swipe, {
          toValue: {x: 0, y: 0},
          friction: 5,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const Circles = () => {
    return (
      <View row spread paddingH-36>
        {foods.map(food => {
          return <FoodCircle onPress={() => {}} img={food.img} key={food.text} text={food.text} />;
        })}
      </View>
    );
  };
  const People = () => {
    return (
      <View centerH marginT-24>
        {people.map((person, index) => {
          const isFirst = index === people.length - 1;
          const dragHandlers = isFirst ? panResponder.panHandlers : {};
          return <PersonCard swipe={swipe} key={person.img} person={person} isFirst={isFirst} {...dragHandlers} />;
        })}
      </View>
    );
  };

  return (
    <View flex-1 backgroundColor={Colors.secondary}>
      <View paddingT-60>
        <Circles />
      </View>
      <People />
    </View>
  );
};

export default Main;
