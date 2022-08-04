import HTTP from '../services/HTTP';
import { commonExceptionMessage } from 'src/config/translations/en';
// import { setSpinner } from 'actions/common/common';
// import { store } from 'App';
import { GET } from 'src/constants/requestTypes';
import { displaySuccessToast, displayErrorToast } from 'src/helpers/toast';
// import Cookies from 'helpers/Cookies';
// import { ACCESS_TOKEN } from 'constants/common';

export default function invokeApiCall({
    requestType = GET,
    endPoint = '',
    apiParams = {},
    shouldShowSuccessMessage = false,
    shouldShowErrorMessage = false,
    setAccessToken = true,
    options
}) {
    //   const { data: accessToken } = Cookies.get(ACCESS_TOKEN);
    //   const END_POINT = setAccessToken ? `${endPoint}?access_token=${accessToken}` : endPoint;
    return HTTP[requestType](endPoint, apiParams, options)
        .then(response => {
            if (response.success) {
                if (shouldShowSuccessMessage) displaySuccessToast(response.data.message || '');
                return response;
            }
            if (shouldShowErrorMessage) displayErrorToast(response.errors.data.message || '');
            return response;
        })
        .catch(() => {
            displayErrorToast(commonExceptionMessage);
            return { success: false };
        });
}
