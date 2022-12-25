import {Platform} from 'react-native';

export const API_URL = Platform.select({ios: 'http://localhost:3000', android: 'http://192.168.29.28:3000'});
