import React, {useCallback, useEffect, useRef, useState} from 'react';

// elements
import {Alert, Animated, PanResponder} from 'react-native';
import {Colors, Text, View} from 'react-native-ui-lib';

// components
import Circles from './components/Circles';
import People from './components/People';

// services
import {getAllUsers, updateUser} from 'api/auth';

// utils
import {handleError, SCREEN_WIDTH} from 'utils/help';
import {IUser} from 'services/types/auth';
import {useAuth} from 'store';
import {LahmacLoading} from 'components';

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
  const {user, setUser} = useAuth();
  const [people, setPeople] = useState<IUser[]>([]);
  const [pending, setPending] = useState(true);
  const [noPeopleLeft, setNoPeopleLeft] = useState(false);

  const swipe = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    if (people.length === 0) {
      getAvailableUsers();
    }
  }, [people]);

  const getAvailableUsers = async () => {
    try {
      setPending(true);
      const users = await getAllUsers();
      if (users.length === 0) {
        setNoPeopleLeft(true);
      }
      setPeople(users);
    } catch (error) {
      handleError(error);
    } finally {
      setPending(false);
    }
  };

  const removePerson = useCallback(() => {
    setPeople(prev => {
      return prev.slice(0, -1);
    });
    swipe.setValue({x: 0, y: 0});
  }, [swipe]);

  const likeHandler = async (preference: 'likes' | 'dislikes') => {
    const newUserField = {
      [preference]: [...user[preference], people[people.length - 1]._id],
    };
    try {
      updateUser(user?._id as string, newUserField);
      setUser({...user, ...newUserField});
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    }
  };

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
        setTimeout(() => {
          if (direction < 0) {
            likeHandler('dislikes');
          } else {
            likeHandler('likes');
          }
          removePerson();
        }, 200);
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
      {pending ? (
        <View centerH centerV flex-1>
          <Text title accent marginB-24>
            Yeni Lahmaçlar Aranıyor...{' '}
          </Text>
          <LahmacLoading small />
        </View>
      ) : (
        <People people={people} panResponder={panResponder} swipe={swipe} noPeopleLeft={noPeopleLeft} />
      )}
    </View>
  );
};

export default Main;
