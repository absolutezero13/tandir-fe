import Geolocation from '@react-native-community/geolocation';
import {FormikProps} from 'formik';
import React, {useEffect, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import Geocoder from 'react-native-geocoding';
import {ScrollView} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors, View} from 'react-native-ui-lib';
import AppButton from '../components/AppButton';
import Input from '../components/Input';
import InputWithDropdown from '../components/InputWithDropdown';
import useContainerStyles from '../hooks/useContainerStyles';
import {useServices} from '../services';
import {GOOGLE_API_KEY} from '../services/api/contants';

const InitialRegister = ({formik}: {formik: FormikProps<any>}) => {
  const [show, setShow] = useState(false);
  const [cities, setCities] = useState<string[]>([]);
  const [counties, setCounties] = useState<string[]>([]);
  const {nav, api} = useServices();
  const containerStyles = useContainerStyles();
  const {turkeyApi, authApi} = api;
  const {values, handleChange, setFieldValue, handleSubmit, isValid} = formik;

  useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      Geocoder.init(GOOGLE_API_KEY);
      Geocoder.from(position.coords.latitude, position.coords.longitude)
        .then(json => {
          const city = json.results[0].address_components[2].long_name;
          const county = json.results[0].address_components[1].long_name;
          setFieldValue('city', city);
          setFieldValue('county', county);
        })
        .catch(err => console.log({err}));
    });

    turkeyApi.getCities().then(res => {
      const formattedCities = res.map(c => c.name);
      setCities(formattedCities.sort((a, b) => (a[0].toLocaleLowerCase('tr') > b[0].toLocaleLowerCase('tr') ? 1 : -1)));
    });
  }, [turkeyApi]);

  useEffect(() => {
    if (values.city) {
      turkeyApi.getCounties(values.city).then(res => {
        const formattedCounties = res.map(c => c.name);

        setCounties(formattedCounties);
      });
    }
  }, [values.city]);
  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" backgroundColor={Colors.secondary}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
          ...containerStyles,
        }}
      >
        <View marginT-36>
          <Input
            marginB-12
            value={values.username}
            onChangeText={handleChange('username')}
            placeholder="Kullanıcı Adı"
          />
          <Input
            marginB-12
            value={values.password}
            onChangeText={handleChange('password')}
            placeholder="Şifre"
            secureTextEntry
            textContentType={'oneTimeCode'}
          />
          <Input
            marginB-12
            value={values.confirmPassword}
            onChangeText={handleChange('confirmPassword')}
            placeholder="Şifre Tekrar"
            secureTextEntry
            textContentType={'oneTimeCode'}
          />
          <Input marginB-12 value={values.email} onChangeText={handleChange('email')} placeholder="E-Posta" />
          <Input
            marginB-12
            value={values.phoneNumber}
            onChangeText={handleChange('phoneNumber')}
            placeholder="Telefon"
            keyboardType="number-pad"
            maxLength={10}
          />
          <Input
            marginB-12
            value={values.birthDate ? values.birthDate.toISOString().split('T')[0] : ''}
            editable={false}
            placeholder="Doğum Tarihi"
            onPressIn={() => setShow(true)}
          />

          <InputWithDropdown
            editable={false}
            data={cities}
            onItemPress={(val: string) => setFieldValue('city', val)}
            value={values.city}
            placeholder="İl"
            onChangeText={handleChange('city')}
            searchPlaceHolder="İl Ara"
          />
          <InputWithDropdown
            searchPlaceHolder="İlçe Ara"
            onItemPress={(val: string) => setFieldValue('county', val)}
            data={counties}
            value={values.county}
            placeholder="İlçe"
            onChangeText={handleChange('county')}
          />
        </View>
        <View centerH marginT-24>
          <AppButton text="İleri" onPress={handleSubmit} disabled={!isValid} marginT-24 />
        </View>
      </ScrollView>
      <DatePicker
        locale="tr"
        date={(values.birthDate as Date) || new Date()}
        mode="date"
        modal
        open={show}
        onConfirm={date => {
          setShow(false);
          setFieldValue('birthDate', date);
        }}
        onCancel={() => {
          setShow(false);
        }}
      />
    </KeyboardAwareScrollView>
  );
};

export default InitialRegister;
