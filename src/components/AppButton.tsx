import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Colors, MarginModifiers, Text, View} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Ionicons';
import {Bounceable} from 'rn-bounceable';

type Props = MarginModifiers & {
  text: string;
  onPress: PureFunc;
  disabled?: boolean;
  iconName?: string;
  iconPosition?: 'left' | 'right';
  width?: string | number;
  color?: string;
};

export const AppButton = ({
  text,
  width,
  color = Colors.primary,
  onPress,
  disabled,
  iconName,
  iconPosition = 'left',
  ...modifiers
}: Props) => {
  const opacity = disabled ? 0.5 : 1;
  const left = iconPosition === 'left' ? '5%' : '70%';
  const buttonWidth = width || Dimensions.get('window').width / 2;

  return (
    <Bounceable activeScale={0.95} disabled={disabled} onPress={onPress}>
      {iconName && (
        <View style={[styles.back, {left}]}>
          <Icon size={40} name={iconName} color={Colors.white} />
        </View>
      )}
      <View
        style={[
          styles.button,
          {
            opacity,
            width: buttonWidth,
            backgroundColor: color,
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
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    height: 60,
  },
  back: {
    position: 'absolute',
    zIndex: 1,
    top: 8,
    left: 10,
  },
});

export default AppButton;
