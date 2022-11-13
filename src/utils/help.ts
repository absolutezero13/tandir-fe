import {AxiosRequestHeaders} from 'axios';
import {Dimensions, Platform} from 'react-native';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import RNRestart from 'react-native-restart';
import {photoBoxes} from '../screens/Register';
import {IUser} from '../services/types/auth';
import {useAuth} from '../zustand';

export const restartApp = RNRestart.Restart;
export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen');

export const initialValues: IUser = {
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
  geometry: {
    type: '',
    geometry: [0, 0],
  },
};

export const defaultUserValues = {
  pictures: [],
  matches: [],
  likes: [],
  role: 'user',
  createdAt: new Date().toISOString(),
};

export const mockMessages = [
  {
    order: 0,
    text: 'naber yia ne zaman anaaaa lahmaç yiyoruz?',
    isSelf: false,
  },
  {
    order: 1,
    text: 'allah bilir...',
    isSelf: true,
  },
  {
    order: 2,
    text: 'ne demek istiyosun yav..',
    isSelf: false,
  },
  {
    order: 3,
    text: 'aŞŞşŞşşŞş',
    isSelf: true,
  },
  {
    order: 4,
    text: 'tatava yapma!...',
    isSelf: true,
  },

  {
    order: 5,
    text: 'naber yia ne zaman anaaaa lahmaç yiyoruz?',
    isSelf: false,
  },
  {
    order: 6,
    text: 'allah bilir...',
    isSelf: true,
  },
  {
    order: 7,
    text: 'ne demek istiyosun yav..',
    isSelf: false,
  },
  {
    order: 8,
    text: 'aŞŞşŞşşŞş',
    isSelf: true,
  },
  {
    order: 9,
    text: 'tatava yapma!...',
    isSelf: true,
  },
  {
    order: 10,
    text: 'naber yia ne zaman anaaaa lahmaç yiyoruz?',
    isSelf: false,
  },
  {
    order: 11,
    text: 'allah bilir...',
    isSelf: true,
  },
  {
    order: 12,
    text: 'ne demek istiyosun yav..',
    isSelf: false,
  },
  {
    order: 13,
    text: 'aŞŞşŞşşŞş',
    isSelf: true,
  },
  {
    order: 14,
    text: 'tatava yapma!...',
    isSelf: true,
  },
];

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
