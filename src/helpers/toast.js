import { toast } from 'react-toastify';
import TOAST_TYPES from 'src/constants/toastTypes';

function displayToast({ message = '', toastType = TOAST_TYPES.INFO }) {
  return toast[toastType](message);
}

export function displaySuccessToast(message = '') {
  return displayToast({
    toastType: TOAST_TYPES.SUCCESS,
    message
  });
}

export function displayErrorToast(message = '') {
  return displayToast({
    toastType: TOAST_TYPES.ERROR,
    message
  });
}
