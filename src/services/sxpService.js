import invokeApiCall from '../helpers/apiHelper';
import { POST } from '../constants/requestTypes';
import { GET } from 'src/constants/requestTypes';
import { CASE_EVENT, CONVERSATION_HISTORY } from 'src/constants/endpoints';
import { displayErrorToast } from 'src/helpers/toast';


export function triggerJourney(url, data) {
    return invokeApiCall({
      requestType: POST,
      endPoint: url + CASE_EVENT,
      apiParams: data,
      shouldShowSuccessMessage : false,
      shouldShowErrorMessage : false,     
      setAccessToken: true
    }).then(({ success, data: responseData, showInlineAlerts = false, errors } = {}) => {
      if (success) {
        return { success, data: responseData };
      }
      if(!success) {
          if(errors.status == 500){
                errors.data.message = errors.data.message ? JSON.parse(errors.data.message).message : ''
          }
            return { success, errors, showInlineAlerts };
      }
      
    });
  }

  export function submitMessage(url,data) {
    return invokeApiCall({
      endPoint: url + CASE_EVENT,
      apiParams: data,
      shouldShowSuccessMessage : false,
      shouldShowSuccessMessage : false,
      requestType: POST,
      setAccessToken: true
    }).then(({ success, data: responseData, showInlineAlerts = false, errors } = {}) => {
      if (success) {
        return { success, data: responseData };
      }
      if(!success) {
          if(errors.status == 500){
            // errors.data.message = errors.data.message ? errors.data.message : ''

                errors.data.message = errors.data.message ? JSON.parse(errors.data.message).message : ''
          }
            return { success, errors, showInlineAlerts };
      }
      
    });
  }

  export function getConversationHistory(url, data) {
    return invokeApiCall({
      endPoint: url + CONVERSATION_HISTORY + data,
      apiParams: {},
      shouldShowSuccessMessage : false,
      shouldShowSuccessMessage : false,
      requestType: GET,
      setAccessToken: false
    }).then(({ success, data: responseData, showInlineAlerts = false, errors } = {}) => {
      if (success) {
        return { success, data: responseData };
      }
      if(!success) {
            return { success, errors, showInlineAlerts };
      }
      
    });
  }


