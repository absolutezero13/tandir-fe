import {useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import * as Yup from 'yup';
import RegisterPhotos from './components/RegisterPhotos';
import RegisterDescription from './components/RegisterDescription';
import InitialRegister from './components/InitialRegister';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';
import {Alert, BackHandler} from 'react-native';
import Register2 from './components/Register2';
import {defaultUserValues, createFormData, handleError} from '../../utils/help';
import differenceInDays from 'date-fns/differenceInDays';
import {useLoading} from '@store';
import {View} from 'react-native-ui-lib';
import {authApi} from '@api';
import {useCustomNavigation} from '@hooks';

export const photoBoxes = [
  {
    data: null,
  },
  {data: null},
  {
    data: null,
  },
  {data: null},
];

interface IPhoto {
  data: null | ImageOrVideo;
}

const isUniqueCheck = async (fieldName: string, value: any) => {
  const res = await authApi.isUnique({
    fieldName,
    value,
  });

  return res.isUnique;
};

const Schema1 = Yup.object().shape({
  username: Yup.string()
    .required('Kullanıcı adı boş olamaz')
    .test('uniq check', 'zaten kullanılıyor.', val => isUniqueCheck('username', val))
    .min(4, 'Kullanıcı adı en az 4 karakter olmalı.')
    .max(20),
  password: Yup.string().required('Şifre boş olamaz').min(6, 'Şifre en az 6 karakter olmalı.').max(20),
  confirmPassword: Yup.string()
    .required('Şifre tekrarı boş olamaz')
    .test('passwords-match', 'Şifreler eşleşmeli.', function (value) {
      return this.parent.password === value;
    })
    .max(20),
  gender: Yup.string().required('Cinsiyet boş olamaz'),
});

const Schema2 = Yup.object().shape({
  phoneNumber: Yup.string()
    .required('Telefon numarası boş olamaz')
    .max(10, '')
    .min(10, '')
    .test('uniq check', 'zaten kullanılıyor.', val => isUniqueCheck('phoneNumber', val)),
  birthDate: Yup.string()
    .required('Doğum tarihi boş olamaz')
    .test('18 check', '18 yaşından büyük olmalısın', val => {
      const diff = differenceInDays(new Date(), new Date(val as string));

      return diff >= 365 * 18;
    }),
  city: Yup.string().required('İl boş olamaz'),
  county: Yup.string().required('İlçe boş olamaz'),
});

const Register = () => {
  const [step, setStep] = useState(0);
  const [photos, setPhotos] = useState<IPhoto[]>(photoBoxes);
  const [description, setDescription] = useState('');
  const [coords, setCoords] = useState<[number, number] | null>(null);
  const navigation = useNavigation();
  const {navigate} = useCustomNavigation();
  const {setLoading} = useLoading();
  const {register, uploadImages, login} = authApi;
  const register1Formik = useFormik({
    initialValues: {username: '', password: '', confirmPassword: '', gender: ''},
    validateOnMount: true,
    validationSchema: Schema1,
    onSubmit: async () => {
      setStep(1);
    },
  });

  const register2Formik = useFormik({
    initialValues: {phoneNumber: '', birthDate: '', city: '', county: ''},
    validateOnMount: true,
    validationSchema: Schema2,
    onSubmit: async () => {
      setStep(2);
    },
  });

  useEffect(() => {
    if (step === 0) {
      navigation.setOptions({
        headerTitle: 'Bilgilerini gir',
      });
    }
    if (step === 1) {
      navigation.setOptions({
        headerTitle: 'Bilgilerini gir',
        // headerBackVisible: false,
      });
    }
    if (step === 2) {
      navigation.setOptions({
        headerTitle: 'Fotoğraf Ekle',
        headerBackVisible: false,
      });
    }
    if (step === 3) {
      navigation.setOptions({
        headerTitle: 'Açıklama Yaz',
        headerBackVisible: false,
      });
    }
  }, [step, navigation]);

  useEffect(() => {
    if (step > 0) {
      const backAction = () => {
        setStep(step - 1);
        return true;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => backHandler.remove();
    }
  }, [step]);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const user = await register({
        ...register1Formik.values,
        ...register2Formik.values,
        ...defaultUserValues,
        birthDateInMs: new Date(register2Formik.values.birthDate).getTime(),
        preferences: {
          ...defaultUserValues.preferences,
          gender:
            register1Formik.values.gender === 'male'
              ? 'female'
              : register1Formik.values.gender === 'female'
              ? 'male'
              : 'all',
        },
        description,
        geometry: {
          type: 'Point',
          coordinates: coords as [number, number],
        },
      });

      const formData = createFormData(photos);
      await uploadImages(formData, user._id as string);
      await login({
        password: register1Formik.values.password,
        username: register1Formik.values.username,
      });

      // Alert.alert('SUCCCES!');
      setLoading(false);
      navigate('Tabs');
    } catch (error) {
      setLoading(false);
      console.log(error);
      handleError(error);
    }
  };

  switch (step) {
    case 0:
      return <InitialRegister formik={register1Formik} />;
    case 1:
      return <Register2 setCoords={setCoords} setStep={setStep} formik={register2Formik} />;
    case 2:
      return <RegisterPhotos setStep={setStep} photos={photos} setPhotos={setPhotos} />;
    case 3:
      return (
        <RegisterDescription
          setStep={setStep}
          setDescription={setDescription}
          description={description}
          handleRegister={handleRegister}
        />
      );
    default:
      return <View />;
  }
};

export default Register;
