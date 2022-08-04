import invokeApiCall from '../helpers/apiHelper';
import { POST, DELETE, PUT } from '../constants/requestTypes';
import { GET } from 'src/constants/requestTypes';
import { CONFIG } from 'src/constants/endpoints';

const BASE_URL = `${process.env.REACT_APP_CUSTOM_API_SERVER_URL}`

export function getConfig() {
  return invokeApiCall({
    endPoint: BASE_URL + CONFIG,
    apiParams: {},
    requestType: GET,
    setAccessToken: false
  }).then(({ success, data: responseData, showInlineAlerts = false, errors } = {}) => {
    if (success) {
      return { success, data: responseData?.data };
    }
    return { success, errors, showInlineAlerts };
  });
}