import axios from 'axios';
import {ICity} from '../types/turkey';

export class TurkeyApi {
  endpoint = 'https://turkeys-api.herokuapp.com';

  getCities = async (): Promise<ICity[]> => {
    const res = await axios.get(this.endpoint + '/cities');

    return res.data.data;
  };

  getCounties = async (city: string) => {
    const res = await axios.get(`${this.endpoint}/counties?city=${city}`);

    return res.data.data;
  };
}
