import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Colors, MarginModifiers, Text, View} from 'react-native-ui-lib';

import {Bounceable} from 'rn-bounceable';

type Props = MarginModifiers & {
  text: string;
  onPress: () => void;
  disabled?: boolean;
};

export const AppButton = ({text, onPress, disabled, ...modifiers}: Props) => {
  const opacity = disabled ? 0.5 : 1;
  return (
    <Bounceable activeScale={0.95} disabled={disabled} onPress={onPress}>
      <View
        style={[
          styles.button,
          {
            opacity,
          },
        ]}
        {...modifiers}
      >
        <Text white title bold>
          {text}
        </Text>
      </View>
    </Bounceable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width / 2,
    borderRadius: 16,
    // padding: 16,
    height: 60,
  },
});

export default AppButton;
