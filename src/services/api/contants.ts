import {Platform} from 'react-native';

export const API_URL = Platform.select({ios: 'http://localhost:3001', android: 'http://192.168.1.101:3001'});
