import invokeApiCall from '../helpers/apiHelper';
import { GET } from 'src/constants/requestTypes';
import { CASE_COMMENTS } from 'src/constants/endpoints';

interface getResponseProps {
  success: boolean;
  data: any;
  showInlineAlerts: boolean;
  errors: any;
}

export function getCommentsList(url, businessKey) {
    return invokeApiCall({
      endPoint: url + CASE_COMMENTS + '?businessKey=' + businessKey,
      apiParams: {},
      requestType: GET,
      setAccessToken: true,
      options:{}
    }).then((response) => {
      const { success = false, data: responseData = {}, showInlineAlerts = false, errors = {} }:getResponseProps = response;
      if (success) {
        return { success, data: responseData };
      }
      return { success, errors, showInlineAlerts };
    });
    // .then(({ success, data: responseData, showInlineAlerts = false, errors } = {}) => {
    //   if (success) {
    //     return { success, data: responseData };
    //   }
    //   return { success, errors, showInlineAlerts };
    // });
  }