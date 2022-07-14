import React from 'react';
import {Colors, Text, View} from 'react-native-ui-lib';
import FoodCircle from '../components/FoodCircle';

const foods = [
  require('../assets/images/tandir.png'),
  require('../assets/images/kiymali.png'),
  require('../assets/images/actualTandir.png'),
];

const Main = () => {
  const Circles = () => {
    return (
      <View row spread paddingH-48>
        {foods.map(food => {
          return <FoodCircle onPress={() => {}} img={food} />;
        })}
      </View>
    );
  };

  return (
    <View flex-1 backgroundColor={Colors.secondary} paddingT-48>
      <Circles />
    </View>
  );
};

export default Main;
