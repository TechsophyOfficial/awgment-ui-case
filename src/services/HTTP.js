import { commonExceptionMessage, unAuthenticateUserExceptionMessage } from 'src/config/translations/en';
// import ROUTES from 'config/routes';
// import Cookies from 'helpers/Cookies';
import defaultAPIClient from './client';
// import { ACCESS_TOKEN, BASE_URL } from 'constants/common';

// const navigate = useNavigate();

function callApi(endpoint, method, body, { APIClient = defaultAPIClient } = {}) {
  APIClient.defaults.headers['Authorization'] = "Bearer " + sessionStorage.getItem('react-token');
  return APIClient[method](endpoint, body)
    .then(response => {
      return { success: true, data: response.data };
    })
    .catch(error => {
      if (error.response) {
        /*
          This code block will be executed if the request was made and the server
          responded with a status code that falls out of the range of 2xx (i.e. 3xx and 4xx etc.)
        */
        if (error.response.status === 401) {
          // Cookies.remove(ACCESS_TOKEN);
          // navigate('/app/my-tasks', { replace: true });      
          return {
            success: false,
            errors: { data: { message: unAuthenticateUserExceptionMessage } }
          };
        }
        if (error.response.status === 400) {
          return { success: false, errors: error.response, showInlineAlerts: true };
        }

        return { success: false, errors: error.response };
      }
      if (error.request) {
        // The request was made but no response was received
        return {
          success: false,
          errors: { data: { message: commonExceptionMessage } }
        };
      }
      // // Something happened in setting up the request that triggered an Error
      return {
        success: false,
        errors: error
      };
    });
}



export default {
  get: (url, body, options) => callApi(url, 'get', { params: body }, options),
  post: (url, body, options) => callApi(url, 'post', body, options),
  put: (url, body, options) => callApi(url, 'put', body, options),
  delete: (url, body, options) => callApi(url, 'delete', body, options)
};