import React from 'react';
import {View} from 'react-native-ui-lib';
import {FoodCircle} from 'components';

const Circles = ({foods}) => {
  return (
    <View row spread paddingH-36 paddingT-12>
      {foods.map(food => {
        return <FoodCircle onPress={() => {}} img={food.img} key={food.text} text={food.text} />;
      })}
    </View>
  );
};

export default Circles;
