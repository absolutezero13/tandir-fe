import React from 'react';
import {Colors, Text, View} from 'react-native-ui-lib';
import FoodCircle from '../components/FoodCircle';

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

const Main = () => {
  const Circles = () => {
    return (
      <View row spread paddingH-48>
        {foods.map(food => {
          return <FoodCircle onPress={() => {}} img={food.img} key={food.text} text={food.text} />;
        })}
      </View>
    );
  };

  return (
    <View flex-1 backgroundColor={Colors.secondary}>
      <View paddingT-60>
        <Circles />
      </View>
    </View>
  );
};

export default Main;
