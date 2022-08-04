import invokeApiCall from '../helpers/apiHelper';
import { GET } from 'src/constants/requestTypes';
import { CASE_COMMENTS } from 'src/constants/endpoints';

const BASE_URL = `${process.env.REACT_APP_API_GATEWAY_URL}`

export function getCommentsList(businessKey) {
    return invokeApiCall({
      endPoint: BASE_URL + CASE_COMMENTS + '?businessKey=' + businessKey,
      apiParams: {},
      requestType: GET,
      setAccessToken: true
    }).then(({ success, data: responseData, showInlineAlerts = false, errors } = {}) => {
      if (success) {
        return { success, data: responseData };
      }
      return { success, errors, showInlineAlerts };
    });
  }