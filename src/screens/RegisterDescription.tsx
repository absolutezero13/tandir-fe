import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Text, View} from 'react-native-ui-lib';
import AppButton from '../components/AppButton';
import Input from '../components/Input';
import useContainerStyle from '../hooks/useContainerStyles';
import {SCREEN_WIDTH} from '../utils/help';

interface Props {
  description: string;
  setDescription: (desc: string) => void;
  handleRegister: PureFunc;
  setStep: (step: number) => void;
}

const RegisterDescription = ({description, setDescription, handleRegister, setStep}: Props) => {
  const containerStyles = useContainerStyle();

  return (
    <KeyboardAwareScrollView
      style={containerStyles}
      contentContainerStyle={{flex: 1}}
      keyboardShouldPersistTaps="handled"
      bounces={false}
    >
      <Text marginT-24 whitish center xlarge>
        Kendin hakkında bir açıklama yaz (İlgi alanları, meslek, karakter özellikleri vb.).
      </Text>
      <View marginT-24>
        <Input
          value={description}
          onChangeText={setDescription}
          height={240}
          multiline
          textAlignVertical="top"
          placeholder="En az 20 karakter."
        />
      </View>
      <View marginB-40 row spread width={'100%'} style={{marginTop: 'auto'}}>
        <AppButton
          iconName="arrow-back-outline"
          width={SCREEN_WIDTH / 2 - 40}
          iconPosition="left"
          text="Geri"
          onPress={() => setStep(2)}
        />
        <AppButton
          width={SCREEN_WIDTH / 2 - 40}
          onPress={handleRegister}
          disabled={!(description.trim().length >= 20)}
          text="Kayıt Ol"
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default RegisterDescription;
