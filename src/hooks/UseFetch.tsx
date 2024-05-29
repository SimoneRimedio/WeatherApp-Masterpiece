import axios, { AxiosResponse } from 'axios';

interface UseFetchProps {
  url: string;
  body?: object;
}

const useFetch = async ({ url, body }: UseFetchProps): Promise<AxiosResponse> => {
  return body ? await axios.post(url, body) : await axios.get(url);
};

export default useFetch;