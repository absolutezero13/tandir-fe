import React from 'react';
import {View} from 'react-native-ui-lib';
import {PersonCard} from 'components';

const People = ({people, panResponder, swipe}) => {
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

export default People;
