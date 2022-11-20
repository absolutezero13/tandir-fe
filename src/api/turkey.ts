import axios from 'axios';
import {ICity, ITown} from '../services/types/turkey';

const endpoint = 'https://turkeys-api.herokuapp.com';

export const getCities = async (): Promise<ICity[]> => {
  const res = await axios.get(endpoint + '/cities');

  return res.data.data;
};

export const getCounties = async (city: string): Promise<ITown[]> => {
  const res = await axios.get(`${endpoint}/counties?city=${city}`);

  return res.data.data;
};
