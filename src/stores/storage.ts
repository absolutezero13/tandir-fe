import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export enum STORAGE_KEYS {
  TANDIR_TOKEN = 'tandir-token',
}
