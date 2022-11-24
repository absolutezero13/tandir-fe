import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useState} from 'react';

// elements
import {Alert, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors, View} from 'react-native-ui-lib';

// components
import {AppButton, Input, InputWithDropdown} from '@components';

// helpers
import {useContainerStyles} from '@hooks';
import {turkeyApi} from '@api';
import {getLocationFromCoordinates} from 'api/geo';
import {SCREEN_WIDTH} from 'utils/help';

// types
import {FormikProps} from 'formik';

const ListFooterComponent = ({setStep, isValid}: any) => {
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

const Register2 = ({
  formik,
  setStep,
  setCoords,
}: {
  formik: FormikProps<any>;
  setStep: Function;
  setCoords: Function;
}) => {
  const {values, errors, handleChange, setFieldValue} = formik;
  const containerStyles = useContainerStyles();
  const [show, setShow] = useState(false);
  const [cities, setCities] = useState<string[]>([]);
  const [counties, setCounties] = useState<string[]>([]);

  useEffect(() => {
    if (!values.city) {
      Geolocation.getCurrentPosition(
        async position => {
          setCoords([position.coords.longitude, position.coords.latitude]);
          const res = await getLocationFromCoordinates({lat: position.coords.latitude, lng: position.coords.longitude});
          setFieldValue('city', res.results[0].components.state);
          setFieldValue('county', res.results[0].components.town);
        },
        error => Alert.alert('Error', JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    }

    if (cities.length === 0) {
      turkeyApi.getCities().then(res => {
        const formattedCities = res.map(c => c.name);
        setCities(
          formattedCities.sort((a, b) => (a[0].toLocaleLowerCase('tr') > b[0].toLocaleLowerCase('tr') ? 1 : -1)),
        );
      });
    }
  }, [values.city, setFieldValue, cities.length, setCoords]);

  useEffect(() => {
    if (values.city) {
      turkeyApi.getCounties(values.city).then(res => {
        const formattedCounties = res.map(c => c.name);

        setCounties(formattedCounties);
      });
    }
  }, [values.city]);

  return (
    <>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" style={styles.view}>
        <View style={containerStyles} marginT-36>
          <Input
            marginB-12
            value={values.phoneNumber}
            onChangeText={handleChange('phoneNumber')}
            placeholder="Telefon"
            keyboardType="number-pad"
            maxLength={10}
            error={values.phoneNumber.length === 10 ? (errors.phoneNumber as string) : undefined}
          />
          <Input
            marginB-12
            value={values.birthDate ? values.birthDate.toISOString().split('T')[0] : ''}
            // editable={false}
            placeholder="Doğum Tarihi"
            onPressIn={() => setShow(true)}
            error={errors.birthDate as string}
          />

          <InputWithDropdown
            // editable={false}
            data={cities}
            onItemPress={(val: string) => setFieldValue('city', val)}
            value={values.city}
            placeholder="İl"
            searchPlaceHolder="İl Ara"
          />
          <InputWithDropdown
            // editable={false}
            searchPlaceHolder="İlçe Ara"
            onItemPress={(val: string) => setFieldValue('county', val)}
            data={counties}
            value={values.county}
            placeholder="İlçe"
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

const styles = StyleSheet.create({
  view: {
    backgroundColor: Colors.secondary,
  },
});
