import React from 'react';
import {MarginModifiers, Text, View} from 'react-native-ui-lib';

import {Bounceable} from 'rn-bounceable';

type Props = MarginModifiers & {
  text?: string;
  onPress: () => void;
};

export const AppButton = ({text, onPress, ...modifiers}: Props) => {
  return (
    <View {...modifiers}>
      <Bounceable onPress={onPress}>
        <Text>{text}</Text>
      </Bounceable>
    </View>
  );
};

export default AppButton;
