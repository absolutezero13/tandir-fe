import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {View} from 'react-native-ui-lib';
import AppButton from '../components/AppButton';
import Input from '../components/Input';
import useContainerStyle from '../hooks/useContainerStyles';

const RegisterDescription = ({description, setDescription, handleRegister}) => {
  const containerStyles = useContainerStyle();

  return (
    <KeyboardAwareScrollView style={containerStyles} keyboardShouldPersistTaps="handled">
      <View marginT-24>
        <Input
          value={description}
          onChangeText={setDescription}
          height={300}
          multiline
          placeholder="En az 20 karakter."
        />
      </View>
      <View center marginT-24>
        <AppButton onPress={handleRegister} disabled={!(description.trim().length >= 20)} text="Kayıt Ol" />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default RegisterDescription;
