import React, {useCallback, useEffect, useRef, useState} from 'react';

// elements
import {Alert, Animated, PanResponder} from 'react-native';
import {Colors, Text, View} from 'react-native-ui-lib';

// components
import Circles from './components/Circles';
import People from './components/People';

// services
import {getAllUsers, getUser, updateUser} from 'api/auth';

// utils
import {SCREEN_WIDTH} from 'utils/help';
import {IUser} from 'services/types/auth';
import {useAuth} from 'store';
import {LahmacLoading, Matched, WithFocus} from 'components';
import {createConversation} from 'api/conversation';

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
  const [matchedModalVisible, setMatchedModalVisible] = useState(false);
  const [matchedUser, setMatchedUser] = useState<IUser | null>(null);
  const [isLiking, setIsLiking] = useState(true);

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
      } else {
        setPeople(users);
      }
    } catch (error) {
      Alert.alert('Some error!');
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
    const currentPerson = people[people.length - 1];
    const newUserField = {
      [preference]: [...user[preference], currentPerson._id],
    };

    if (user[preference].includes(currentPerson._id)) {
      return;
    }

    try {
      if (preference === 'likes') {
        const likedUser = await getUser(currentPerson?._id);
        if (likedUser.likes.includes(user?._id as string)) {
          setMatchedModalVisible(true);
          setMatchedUser(currentPerson);
          const matchId = `${user._id}${currentPerson._id}`;
          await updateUser(user?._id as string, {
            matches: [...user?.matches, {userId: currentPerson._id, matchId}],
          });
          await updateUser(currentPerson?._id as string, {
            matches: [...currentPerson?.matches, {userId: user._id, matchId}],
          });
          const response = await createConversation({matchId, matchedUserId: currentPerson._id});
          console.log('response conversation', response);
        }
      }
      const resp = await updateUser(user?._id as string, newUserField);
      removePerson();
      setUser(resp);
    } catch (error) {
      console.log({error});
      Alert.alert('Some error!');
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, {dx, dy}) => {
      const direction = Math.sign(dx);
      setIsLiking(direction > 0);
      swipe.setValue({x: dx, y: dy});
    },
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
      return gestureState.dx !== 0 && gestureState.dy !== 0;
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
    <WithFocus onFocus={getAvailableUsers}>
      <>
        {matchedModalVisible && matchedUser && (
          <Matched matchedUser={matchedUser} visible={matchedModalVisible} setVisible={setMatchedModalVisible} />
        )}
        <View flex-1 backgroundColor={Colors.secondary}>
          <Circles foods={foods} />
          {pending ? (
            <View centerH centerV flex-1>
              <Text title accent marginB-24>
                Yeni Lahmaçlar Aranıyor...{' '}
              </Text>
              <LahmacLoading small />
            </View>
          ) : (
            <People
              people={people}
              panResponder={panResponder}
              swipe={swipe}
              noPeopleLeft={noPeopleLeft}
              isLiking={isLiking}
            />
          )}
        </View>
      </>
    </WithFocus>
  );
};

export default Main;
