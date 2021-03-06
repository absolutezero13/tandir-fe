import React from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Colors, MarginModifiers, View} from 'react-native-ui-lib';
import {TextFieldProps} from 'react-native-ui-lib/typings';

const Input = (props: TextFieldProps & MarginModifiers) => {
  return (
    <View {...props}>
      <TextInput
        {...props}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor="rgba(0,0,0,0.2)"
        style={styles.container}
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
    height: 70,
    fontSize: 24,
    backgroundColor: Colors.white,
    fontWeight: 'bold',
  },
});

export default Input;
