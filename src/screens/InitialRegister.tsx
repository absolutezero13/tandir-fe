import {FormikProps} from 'formik';
import React from 'react';
import {StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors, RadioButton, Text, View} from 'react-native-ui-lib';
import AppButton from '../components/AppButton';
import Input from '../components/Input';
import useContainerStyles from '../hooks/useContainerStyles';
import Icon from 'react-native-vector-icons/Ionicons';

const InitialRegister = ({formik}: {formik: FormikProps<any>}) => {
  const containerStyles = useContainerStyles();
  const {values, handleChange, handleSubmit, setFieldValue, isValid, errors} = formik;

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
      <View style={[containerStyles, styles.contentContainer]}>
        <View marginT-36>
          <Input
            marginB-12
            value={values.username}
            onChangeText={handleChange('username')}
            placeholder="Kullanıcı Adı"
            error={errors.username as string}
          />
          <Input
            marginB-12
            value={values.password}
            onChangeText={handleChange('password')}
            placeholder="Şifre"
            secureTextEntry
            textContentType={'oneTimeCode'}
            error={errors.password as string}
          />
          <Input
            marginB-12
            value={values.confirmPassword}
            onChangeText={handleChange('confirmPassword')}
            placeholder="Şifre Tekrar"
            secureTextEntry
            textContentType={'oneTimeCode'}
            error={errors.confirmPassword as string}
          />
          <Input
            marginB-12
            value={values.email}
            error={errors.email as string}
            onChangeText={handleChange('email')}
            placeholder="E-Posta"
          />
          <View row spread center marginT-24>
            <View row centerV marginR-12>
              <RadioButton selected={values.gender === 'male'} onPress={() => setFieldValue('gender', 'male')} />
              <Text white xlarge marginH-4>
                Erkek
              </Text>
              <Icon name="man" color={'white'} size={24} />
            </View>
            <View row centerV>
              <RadioButton selected={values.gender === 'female'} onPress={() => setFieldValue('gender', 'female')} />
              <Text white xlarge marginH-4>
                Kadın
              </Text>
              <Icon name="woman" color={'white'} size={24} />
            </View>
          </View>
          <View row centerV centerH marginT-12>
            <RadioButton selected={values.gender === 'another'} onPress={() => setFieldValue('gender', 'another')} />
            <Text white xlarge marginH-4>
              Başka Bişi
            </Text>
            <Icon name="airplane" color={'white'} size={24} />
          </View>
        </View>

        <View centerH marginT-24>
          <AppButton text="İleri" onPress={handleSubmit} disabled={!isValid} marginT-24 />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
  },
  contentContainer: {
    paddingBottom: 40,
  },
});

export default InitialRegister;
