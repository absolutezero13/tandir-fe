import {AxiosError, AxiosRequestHeaders} from 'axios';
import {differenceInCalendarYears, parse} from 'date-fns';
import {Alert, Dimensions, Platform} from 'react-native';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import RNRestart from 'react-native-restart';
import {photoBoxes} from '../screens/Register/Register';
import {IUser} from '../services/types/auth';
import {useAuth} from '@store';

export const restartApp = RNRestart.Restart;
export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen');

export const initialValues: IUser = {
  username: '',
  password: '',
  confirmPassword: '',
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
  geometry: {
    type: '',
    geometry: [0, 0],
  },
};

export const defaultUserValues = {
  pictures: [],
  matches: [],
  likes: [],
  dislikes: [],
  role: 'user',
  createdAt: new Date().toISOString(),
  preferences: {
    distance: 50,
    ages: {
      min: 18,
      max: 40,
    },
  },
};

export const getHeadersWithJwt = (): {headers: AxiosRequestHeaders} => {
  return {
    headers: {
      Authorization: `Bearer ${useAuth.getState().jwtToken}`,
    },
  };
};

export const createFormData = (photos: {data: ImageOrVideo | null}[]) => {
  const formData = new FormData();

  photos.forEach(photo => {
    if (photo.data) {
      formData.append('image', {
        uri: photo.data?.path,
        type: photo.data?.mime,
        name: Platform.select({ios: photo.data.filename, android: photo.data.path}),
      });
    }
  });

  return formData;
};

export const formatPhotoData = (userImages: {imageUrl: string; imageName: string}[]) => {
  console.log({userImages});
  return photoBoxes.map((img, index) => {
    if (!userImages[index]) {
      return {data: null};
    }
    return {
      data: {path: userImages[index].imageUrl, imageName: userImages[index].imageName},
    };
  });
};

export const handleError = (error: AxiosError) => {
  Alert.alert(error?.response?.data.message);
};

export const formatBD = (birthDate: string) => {
  return birthDate.split('T')[0].split('-').slice().reverse().join('-');
};

export const getAgeFromBD = (birthDate: string) => {
  const formattedBirthDate = formatBD(birthDate);
  const date = parse(formattedBirthDate, 'dd-MM-yyyy', new Date());
  const age = differenceInCalendarYears(new Date(), date);
  return age;
};
