import invokeApiCall from '../helpers/apiHelper';
import { GET } from 'src/constants/requestTypes';
import { CONFIG } from 'src/constants/endpoints';

interface getResponseProps {
  success: boolean;
  data: any;
  showInlineAlerts: boolean;
  errors: any;
}

export function getConfig(url) {
  return invokeApiCall({
    endPoint: url + CONFIG,
    apiParams: {},
    requestType: GET,
    setAccessToken: false,
    options: {}
  }).then((response) => {
    const { success = false, data: responseData = {}, showInlineAlerts = false, errors = {} }:getResponseProps = response;
    if (success) {
      return { success, data: responseData?.data };
    }
    return { success, errors, showInlineAlerts };
  });
}