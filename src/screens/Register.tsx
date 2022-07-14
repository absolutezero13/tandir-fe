import {useFormik} from 'formik';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, Image, View} from 'react-native-ui-lib';
import AppButton from '../components/AppButton';
import Input from '../components/Input';
import {useHeaderHeight} from '@react-navigation/elements';

const initialValues = {
  userName: '',
  password: '',
  confirmPassword: '',
  email: '',
  phone: '',
  birthDate: '',
};

const Register = () => {
  const {top} = useSafeAreaInsets();
  const height = useHeaderHeight();

  const {values, handleChange, isValid} = useFormik({
    initialValues,
    onSubmit: vals => {
      console.log(vals);
    },
  });

  return (
    <View flex-1 backgroundColor={Colors.primary} paddingH-24>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 24,
          paddingTop: height + top + 24,
        }}
      >
        <View center>
          <Image source={require('../assets/images/lahmacOven.png')} resizeMode="contain" style={{width: 300}} />
        </View>

        <View marginT-36>
          <Input
            marginB-12
            value={values.userName}
            onChangeText={handleChange('userName')}
            placeholder="Kullanıcı Adı"
          />
          <Input
            marginB-12
            value={values.password}
            onChangeText={handleChange('password')}
            placeholder="Şifre"
            secureTextEntry
          />
          <Input
            marginB-12
            value={values.confirmPassword}
            onChangeText={handleChange('confirmPassword')}
            placeholder="Şifre Tekrar"
            secureTextEntry
          />
          <Input marginB-12 value={values.email} onChangeText={handleChange('email')} placeholder="E-Posta" />
          <Input marginB-12 value={values.phone} onChangeText={handleChange('phone')} placeholder="Telefon" />
          <Input
            marginB-12
            value={values.birthDate}
            onChangeText={handleChange('birthDate')}
            placeholder="Doğum Tarihi"
            placeholderTextColor="white"
          />
        </View>
        <View centerH marginT-24>
          <AppButton text="Kayıt Ol" onPress={() => {}} disabled={!isValid} marginT-24 />
        </View>
      </ScrollView>
    </View>
  );
};

export default Register;
