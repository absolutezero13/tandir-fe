import React from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Colors, MarginModifiers, View} from 'react-native-ui-lib';
import {TextFieldProps} from 'react-native-ui-lib/typings';

const Input = (props: TextFieldProps & MarginModifiers & {height?: number}) => {
  return (
    <View {...props}>
      <TextInput
        {...props}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor="rgba(0,0,0,0.2)"
        style={[styles.container, {height: props.height || 70}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 16,
    padding: 10,
    color: 'black',

    fontSize: 24,
    backgroundColor: Colors.white,
    fontWeight: 'bold',
  },
});

export default Input;
