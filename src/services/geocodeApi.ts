import useFetch from "../hooks/UseFetch";

const getGeocode = (location: string) =>
  useFetch({ url:`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`});

const getReverseGeocode = (lat: number, lon: number) =>
  useFetch({ url:`https://ramesimo.site/api/getReverseGeocode?lat=${lat}&lon=${lon}`});


export { getGeocode, getReverseGeocode };