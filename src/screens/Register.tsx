import {useFormik} from 'formik';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, Image, View} from 'react-native-ui-lib';
import AppButton from '../components/AppButton';
import Input from '../components/Input';
import {useHeaderHeight} from '@react-navigation/elements';
import {IUser} from '../services/types/auth';
import {Dimensions, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import * as Yup from 'yup';

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
  profilePicture: '',
  role: 'user',
  gender: '',
  createdAt: Date.now().toLocaleString(),
};

const Schema = Yup.object().shape({
  username: Yup.string().required('Kullanıcı adı boş olamaz'),
  password: Yup.string().required('Şifre boş olamaz'),
  confirmPassword: Yup.string().required('Şifre tekrarı boş olamaz'),
  email: Yup.string().email('Geçerli bir e-posta adresi giriniz').required('E-posta boş olamaz'),
  phoneNumber: Yup.string().required('Telefon numarası boş olamaz'),
  birthDate: Yup.string().required('Doğum tarihi boş olamaz'),
});

const Register = () => {
  const [show, setShow] = React.useState(false);
  const {top} = useSafeAreaInsets();
  const height = useHeaderHeight();

  const {values, handleChange, isValid, setFieldValue} = useFormik({
    initialValues,
    validateOnMount: true,
    validationSchema: Schema,
    onSubmit: vals => {
      console.log(vals);
    },
  });

  return (
    <View flex-1 backgroundColor={Colors.secondary} paddingH-24>
      <View center>
        <Image
          source={require('../assets/images/lahmacOven.png')}
          resizeMode="stretch"
          style={{
            ...styles.image,
            top: height + top,
          }}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          ...styles.scrollView,
          paddingTop: height + top + 24,
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
            maxLength={10}
          />
          <Input
            marginB-12
            value={values.birthDate ? values.birthDate.toISOString().split('T')[0] : ''}
            editable={false}
            placeholder="Doğum Tarihi"
            onPressIn={() => setShow(true)}
          />
        </View>
        <View centerH marginT-24>
          <AppButton text="İleri" onPress={() => {}} disabled={!isValid} marginT-24 />
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
    </View>
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
