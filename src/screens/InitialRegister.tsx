// import Geolocation from '@react-native-community/geolocation';
import {FormikProps} from 'formik';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors, RadioButton, Text, View} from 'react-native-ui-lib';
import AppButton from '../components/AppButton';
import Input from '../components/Input';
import useContainerStyles from '../hooks/useContainerStyles';
import {useServices} from '../services';
import {GOOGLE_API_KEY} from '../services/api/contants';
import Icon from 'react-native-vector-icons/Ionicons';

const InitialRegister = ({formik}: {formik: FormikProps<any>}) => {
  const containerStyles = useContainerStyles();
  const {api} = useServices();
  const {turkeyApi} = api;
  const {values, handleChange, handleSubmit, setFieldValue, isValid, errors} = formik;

  useEffect(() => {
    // Geolocation.getCurrentPosition(position => {
    //   Geocoder.init(GOOGLE_API_KEY);
    //   Geocoder.from(position.coords.latitude, position.coords.longitude)
    //     .then(json => {
    //       const city = json.results[0].address_components[2].long_name;
    //       const county = json.results[0].address_components[1].long_name;
    //       setFieldValue('city', city);
    //       setFieldValue('county', county);
    //     })
    //     .catch(err => console.log({err}));
    // });
  }, [turkeyApi]);

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" backgroundColor={Colors.secondary}>
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
  contentContainer: {
    paddingBottom: 40,
  },
});

export default InitialRegister;
