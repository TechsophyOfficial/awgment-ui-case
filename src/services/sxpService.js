import invokeApiCall from '../helpers/apiHelper';
import { POST } from '../constants/requestTypes';
import { GET } from 'src/constants/requestTypes';
import { CASE_EVENT, CONVERSATION_HISTORY } from 'src/constants/endpoints';
import { displayErrorToast } from 'src/helpers/toast';

const BASE_URL = `${process.env.REACT_APP_CUSTOM_API_SERVER_URL}`
const BASE_URL2 = `${process.env.REACT_APP_CONTEXT_ENGINE_API_URL}`


export function triggerJourney(data) {
    return invokeApiCall({
      requestType: POST,
      endPoint: BASE_URL + CASE_EVENT,
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

  export function submitMessage(data) {
    return invokeApiCall({
      endPoint: BASE_URL + CASE_EVENT,
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

  export function getConversationHistory(data) {
    return invokeApiCall({
      endPoint: BASE_URL2 + CONVERSATION_HISTORY + data,
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


