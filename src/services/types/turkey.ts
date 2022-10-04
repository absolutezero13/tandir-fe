export interface ICity {
  _id: string;
  name: string;
  towns: string[];
  geolocation: {
    lat: number;
    lon: number;
  };
}
