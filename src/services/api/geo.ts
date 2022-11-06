import axios from 'axios';

const geoApiKey = 'e4c4ed7974604b658f54adfeb3cded8f';

export const getLocationFromCoordinates = async (body: {lat: number; lng: number}) => {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${body.lat}+${body.lng}&key=${geoApiKey}`;

  const resp = await axios.get(url);

  return resp.data;
};
