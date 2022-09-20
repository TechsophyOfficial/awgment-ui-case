import invokeApiCall from '../helpers/apiHelper';
import { GET } from 'src/constants/requestTypes';
import { CONFIG } from 'src/constants/endpoints';


export function getConfig(url) {
  return invokeApiCall({
    endPoint: url + CONFIG,
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