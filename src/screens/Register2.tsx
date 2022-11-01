import {FormikProps} from 'formik';
import React, {useEffect, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors, View} from 'react-native-ui-lib';
import AppButton from '../components/AppButton';
import Input from '../components/Input';
import InputWithDropdown from '../components/InputWithDropdown';
import useContainerStyles from '../hooks/useContainerStyles';
import {useServices} from '../services';
import {SCREEN_WIDTH} from '../utils/help';

const ListFooterComponent = ({setStep, isValid}) => {
  console.log({isValid});
  return (
    <View row spread width={'100%'} marginT-24>
      <AppButton
        width={SCREEN_WIDTH / 2 - 40}
        iconName="arrow-back-outline"
        iconPosition="left"
        text="Geri"
        onPress={() => setStep(0)}
      />
      <AppButton
        iconName="arrow-forward-outline"
        width={SCREEN_WIDTH / 2 - 40}
        iconPosition="right"
        text="İleri"
        disabled={!isValid}
        onPress={() => setStep(2)}
      />
    </View>
  );
};

const Register2 = ({formik, setStep}: {formik: FormikProps<any>; setStep: Function}) => {
  const {values, errors, handleChange, setFieldValue} = formik;
  const {api} = useServices();
  const containerStyles = useContainerStyles();
  const {turkeyApi} = api;
  const [show, setShow] = useState(false);
  const [cities, setCities] = useState<string[]>([]);
  const [counties, setCounties] = useState<string[]>([]);

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
  }, [values.city, turkeyApi]);

  console.log({show});

  return (
    <>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" backgroundColor={Colors.secondary}>
        <View style={containerStyles} marginT-36>
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
            // editable={false}
            placeholder="Doğum Tarihi"
            onPressIn={() => setShow(true)}
          />

          <InputWithDropdown
            // editable={false}
            data={cities}
            onItemPress={(val: string) => setFieldValue('city', val)}
            value={values.city}
            placeholder="İl"
            // onChangeText={handleChange('city')}
            searchPlaceHolder="İl Ara"
          />
          <InputWithDropdown
            // editable={false}
            searchPlaceHolder="İlçe Ara"
            onItemPress={(val: string) => setFieldValue('county', val)}
            data={counties}
            value={values.county}
            placeholder="İlçe"
            // onChangeText={handleChange('county')}
          />

          <ListFooterComponent setStep={setStep} isValid={formik.isValid} />
        </View>
      </KeyboardAwareScrollView>
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
    </>
  );
};

export default Register2;
