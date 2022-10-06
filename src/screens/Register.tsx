import {useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, View} from 'react-native-ui-lib';
import AppButton from '../components/AppButton';
import Input from '../components/Input';
import {useHeaderHeight} from '@react-navigation/elements';
import {IUser} from '../services/types/auth';
import {Dimensions, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import * as Yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useServices} from '../services';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import {GOOGLE_API_KEY} from '../services/api/contants';
import InputWithDropdown from '../components/InputWithDropdown';

const initialValues: IUser = {
  username: '',
  password: '',
  confirmPassword: '',
  email: '',
  phoneNumber: '',
  birthDate: '',
  likes: [],
  matches: [],
  description: '',
  pictures: [],
  role: 'user',
  gender: 'male',
  createdAt: Date.now().toLocaleString(),
  city: '',
  county: '',
};

const Schema = Yup.object().shape({
  username: Yup.string().required('Kullanıcı adı boş olamaz'),
  password: Yup.string().required('Şifre boş olamaz'),
  confirmPassword: Yup.string().required('Şifre tekrarı boş olamaz'),
  email: Yup.string().email('Geçerli bir e-posta adresi giriniz').required('E-posta boş olamaz'),
  phoneNumber: Yup.string().required('Telefon numarası boş olamaz'),
  birthDate: Yup.string().required('Doğum tarihi boş olamaz'),
  city: Yup.string().required('İl boş olamaz'),
  county: Yup.string().required('İlçe boş olamaz'),
});

const Register = () => {
  const [show, setShow] = useState(false);
  const {top} = useSafeAreaInsets();
  const height = useHeaderHeight();
  const {nav, api} = useServices();
  const {turkeyApi, authApi} = api;

  const [cities, setCities] = useState<string[]>([]);
  const [counties, setCounties] = useState<string[]>([]);
  const {values, handleChange, isValid, setFieldValue, handleSubmit} = useFormik({
    initialValues,
    validateOnMount: true,
    validationSchema: Schema,
    onSubmit: async vals => {
      nav.show('RegisterPhotos');
    },
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      Geocoder.init(GOOGLE_API_KEY);
      Geocoder.from(position.coords.latitude, position.coords.longitude)
        .then(json => {
          const city = json.results[0].address_components[2].long_name;
          const county = json.results[0].address_components[1].long_name;
          setFieldValue('city', city);
          setFieldValue('county', county);
          // setUserPlace(userAdress);
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

  console.log({counties});

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" backgroundColor={Colors.secondary}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          ...styles.scrollView,
          paddingTop: height + top + 24,
          paddingHorizontal: 24,
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

const styles = StyleSheet.create({
  image: {
    height: 600,
    position: 'absolute',
    width: Dimensions.get('window').width,
  },
  scrollView: {
    paddingBottom: 24,
  },
});

export default Register;
