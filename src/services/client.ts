import axios, { AxiosInstance} from 'axios';

/* Axios allows us to define a base instance in which we can define a URL
  and any other configuration elements
*/
const baseURL ='';

const defaultConfig = {
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    "Authorization": "Bearer " + localStorage.getItem('react-token'),
    // common: {
    //   'Content-Type': 'multipart/form-data',
    //    'Accept': 'application/json',
    //   "Authorization": "Bearer " + localStorage.getItem('react-token')
    // }
  },
  responseType: 'json' as 'json'
};

export function getAPIClient(customConfig:any = {}) {
  return axios.create({
    ...defaultConfig,
    ...customConfig
  });
}
const defaultAPIClient:AxiosInstance = getAPIClient();

export default defaultAPIClient;