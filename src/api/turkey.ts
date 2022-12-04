import axios from 'axios';
import {ICity, ITown} from '../services/types/turkey';

const endpoint = 'https://us-central1-tandir-364518.cloudfunctions.net/app';

export const getCities = async (): Promise<ICity[]> => {
  const res = await axios.get(endpoint + '/cities');

  return res.data.data;
};

export const getCounties = async (city: string): Promise<ITown[]> => {
  const res = await axios.get(`${endpoint}/counties?city=${city}`);

  return res.data.data;
};
