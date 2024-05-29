import useFetch from "../hooks/UseFetch";

const getGeocode = (location: string) =>
  useFetch({ url:`https://ramesimo.site/api/getGeocode?location=${location}`});

const getReverseGeocode = (lat: number, lon: number) =>
  useFetch({ url:`https://ramesimo.site/api/getReverseGeocode?lat=${lat}&lon=${lon}`});


export { getGeocode, getReverseGeocode };