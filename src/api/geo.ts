import axios from 'axios';
import {API_URL} from './contants';

export const getLocationFromCoordinates = async (body: {lat: number; lng: number}) => {
  const url = `${API_URL}/geo/location?lat=${body.lat}&lng=${body.lng}`;

  const resp = await axios.get(url);

  return resp.data;
};
