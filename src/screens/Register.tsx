import {useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import * as Yup from 'yup';
import RegisterPhotos from './RegisterPhotos';
import RegisterDescription from './RegisterDescription';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import InitialRegister from './InitialRegister';
import {initialValues} from '../utils/help';
import {useServices} from '../services';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';

const photoBoxes = [
  {
    data: null,
    base64: '',
  },
  {data: null, base64: ''},
  {
    data: null,
    base64: '',
  },
  {data: null, base64: ''},
];

interface IPhoto {
  data: null | ImageOrVideo;
  base64: string;
}

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
  const [step, setStep] = useState(0);
  const [photos, setPhotos] = useState<IPhoto[]>(photoBoxes);
  const [description, setDescription] = useState('');
  const navigation = useNavigation();
  const {register, uploadImages, login} = useServices().api.authApi;
  const formik = useFormik({
    initialValues,
    validateOnMount: true,
    validationSchema: Schema,
    onSubmit: async () => {
      setStep(1);
    },
  });

  useEffect(() => {
    if (step === 0) {
      navigation.setOptions({
        headerTitle: 'Kayıt',
      });
    }
    if (step === 1) {
      navigation.setOptions({
        headerTitle: 'Fotoğraf Ekle',
        headerBackVisible: false,
      });
    }
    if (step === 2) {
      navigation.setOptions({
        headerTitle: 'Açıklama Yaz',
        headerBackVisible: false,
      });
    }
  }, [step]);

  // dev useEffect

  useEffect(() => {
    formik.setFieldValue('username', 'burgay');
    formik.setFieldValue('password', 'burgay');
    formik.setFieldValue('confirmPassword', 'burgay');
    formik.setFieldValue('email', 'burgay@gmail.com');
    formik.setFieldValue('phoneNumber', '5555555555');
    formik.setFieldValue('birthDate', new Date('2000-01-01'));
    formik.setFieldValue('city', 'İstanbul');
    formik.setFieldValue('county', 'Kadıköy');
    setDescription('Dev ortamı için açıklama!');
  }, []);

  const handleRegister = async () => {
    try {
      const user = await register({
        ...formik.values,
        pictures: [],
        description,
      });

      const formData = new FormData();

      photos.forEach(photo => {
        if (photo.data) {
          formData.append('image', {
            uri: photo.data?.path,
            type: photo.data?.mime,
            name: photo.data?.filename,
          });
        }
      });

      await uploadImages(formData, user._id as string);
      await login({
        password: formik.values.password,
        username: formik.values.username,
      });

      Alert.alert('SUCCCES!');
      navigation.navigate('Tabs');
    } catch (error) {
      console.log(error);
      Alert.alert('FAIL!!');
    }
  };

  switch (step) {
    case 0:
      return <InitialRegister formik={formik} />;
    case 1:
      return <RegisterPhotos setStep={setStep} photos={photos} setPhotos={setPhotos} />;
    case 2:
      return (
        <RegisterDescription
          setStep={setStep}
          setDescription={setDescription}
          description={description}
          handleRegister={handleRegister}
        />
      );
  }
};

export default Register;
