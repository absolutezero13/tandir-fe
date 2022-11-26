import React from 'react';
import {Image, Text, View} from 'react-native-ui-lib';
import {PersonCard} from 'components';
import {IUser} from 'services/types/auth';
import {PanResponderInstance, StyleSheet} from 'react-native';
import noLahmacLeft from '@assets/images/empty-stack.jpeg';
import {SCREEN_WIDTH} from 'utils/help';
import FastImage from 'react-native-fast-image';

interface Props {
  people: IUser[];
  panResponder: PanResponderInstance;
  swipe: any;
}

const People = ({people, panResponder, swipe}: Props) => {
  return (
    <View centerH marginT-24>
      {people.length > 0 ? (
        people.map((person, index) => {
          const isFirst = index === people.length - 1;
          const dragHandlers = isFirst ? panResponder.panHandlers : {};
          return <PersonCard swipe={swipe} key={person._id} person={person} isFirst={isFirst} {...dragHandlers} />;
        })
      ) : (
        <View>
          <Text title accent center marginV-32>
            {' '}
            LAHMAÇ KALMADI GİBİ...
          </Text>
          <FastImage source={noLahmacLeft} resizeMode="cover" style={styles.image} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: SCREEN_WIDTH / 1.2,
    height: SCREEN_WIDTH / 1.2,
  },
});

export default People;
