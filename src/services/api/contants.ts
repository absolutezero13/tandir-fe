import {Platform} from 'react-native';

export const API_URL = Platform.select({ios: 'http://localhost:3000', android: 'http://192.168.1.101:3000'});
export const GOOGLE_API_KEY = 'AIzaSyAgZzB5fZAevjqIga38TBQbYxQdO8YYKxk';
