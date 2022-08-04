import invokeApiCall from "../helpers/apiHelper";
import { POST, DELETE, PUT } from "../constants/requestTypes";
import { GET } from "src/constants/requestTypes";
import {
  CASE_DEFINITION,
  CASE_INSTANCE,
  FILTER,
  WORKFLOW,
  WORKFLOW_FILTER,
  TASK,
  CASE_EXECUTION,
  CASE_ACTIVITI_TASKS,
  HISTORY_CASE_INSTANCE,
  RUNTIME_FORM,
  FORM_VARIABLES,
  SUBMIT_TASK,
  WORKFLOW_COMMENTS,
} from "src/constants/endpoints";
import { quoteSummaryApiResponse } from "src/mocks/quoteSummary";
import { HISTORY_API_TIME_INTERVAL } from "src/variables/chatWidget";

// import { SET_MASTER_LIST } from 'constants/master';
// import { SET_FORM_VALUES } from 'constants/bookAnAppointment';
// import { LOCALE_DATA, ACCESS_TOKEN } from 'constants/common';

// import Cookies from 'helpers/Cookies';

const BASE_URL = `${process.env.REACT_APP_SERVER_URL}`;
const GATEWAY_URL = `${process.env.REACT_APP_API_GATEWAY_URL}`;

export function getTask(taskId) {
  return invokeApiCall({
    endPoint: BASE_URL + TASK + `/${taskId}`,
    apiParams: {},
    requestType: GET,
    setAccessToken: false,
  }).then(
    ({
      success,
      data: responseData,
      showInlineAlerts = false,
      errors,
    } = {}) => {
      if (success) {
        return { success, data: responseData };
      }
      return { success, errors, showInlineAlerts };
    }
  );
}

export function getTasks(url, data) {
  return invokeApiCall({
    endPoint: url,
    apiParams: data,
    requestType: POST,
    setAccessToken: false,
  }).then(
    ({
      success,
      data: responseData,
      showInlineAlerts = false,
      errors,
    } = {}) => {
      if (success) {
        return { success, data: responseData };
      }
      return { success, errors, showInlineAlerts };
    }
  );
}

export function getTasksCount(url, data) {
  return invokeApiCall({
    endPoint: url,
    apiParams: data,
    requestType: POST,
    setAccessToken: true,
  }).then(
    ({
      success,
      data: responseData,
      showInlineAlerts = false,
      errors,
    } = {}) => {
      if (success) {
        return { success, data: responseData };
      }
      return { success, errors, showInlineAlerts };
    }
  );
}

export function getFilterList() {
  return invokeApiCall({
    endPoint:
      BASE_URL + FILTER + "?owner=" + localStorage.getItem("currentUser"),
    apiParams: {},
    requestType: GET,
    setAccessToken: true,
  }).then(
    ({
      success,
      data: responseData,
      showInlineAlerts = false,
      errors,
    } = {}) => {
      if (success) {
        return { success, data: responseData };
      }
      return { success, errors, showInlineAlerts };
    }
  );
}

export function getFilter(filterId) {
  return invokeApiCall({
    endPoint: GATEWAY_URL + WORKFLOW_FILTER + "/" + filterId,
    apiParams: {},
    requestType: GET,
    setAccessToken: true,
  }).then(
    ({
      success,
      data: responseData,
      showInlineAlerts = false,
      errors,
    } = {}) => {
      if (success) {
        return { success, data: responseData };
      }
      return { success, errors, showInlineAlerts };
    }
  );
}

export function createFilter(data) {
  return invokeApiCall({
    endPoint: GATEWAY_URL + WORKFLOW_FILTER + "/create",
    apiParams: data,
    requestType: POST,
    setAccessToken: true,
  }).then(
    ({
      success,
      data: responseData,
      showInlineAlerts = false,
      errors,
    } = {}) => {
      if (success) {
        return { success, data: responseData };
      }
      return { success, errors, showInlineAlerts };
    }
  );
}

export function updateFilter(id, data) {
  return invokeApiCall({
    endPoint: BASE_URL + FILTER + `/${id}`,
    apiParams: data,
    requestType: PUT,
    setAccessToken: true,
  }).then(
    ({
      success,
      data: responseData,
      showInlineAlerts = false,
      errors,
    } = {}) => {
      if (success) {
        return { success, data: responseData };
      }
      return { success, errors, showInlineAlerts };
    }
  );
}

export function deleteFilter(filterId) {
  return invokeApiCall({
    endPoint: BASE_URL + FILTER + "/" + filterId,
    apiParams: {},
    requestType: DELETE,
    setAccessToken: true,
  }).then(
    ({
      success,
      data: responseData,
      showInlineAlerts = false,
      errors,
    } = {}) => {
      if (success) {
        return { success, data: responseData };
      }
      return { success, errors, showInlineAlerts };
    }
  );
}

export function getFilterTasksCount(filterId, data) {
  return invokeApiCall({
    endPoint: GATEWAY_URL + WORKFLOW_FILTER + "/" + filterId + "/count",
    apiParams: data,
    requestType: POST,
    setAccessToken: true,
  }).then(
    ({
      success,
      data: responseData,
      showInlineAlerts = false,
      errors,
    } = {}) => {
      if (success) {
        return { success, data: responseData };
      }
      return { success, errors, showInlineAlerts };
    }
  );
}

export function getFilterTasks(filterId, data, queryParam) {
  return invokeApiCall({
    endPoint: BASE_URL + FILTER + "/" + filterId + `/list?${queryParam}`,
    apiParams: data,
    requestType: POST,
    setAccessToken: true,
  }).then(
    ({
      success,
      data: responseData,
      showInlineAlerts = false,
      errors,
    } = {}) => {
      if (success) {
        return { success, data: responseData };
      }
      return { success, errors, showInlineAlerts };
    }
  );
}

export function getCaseDefinition(id) {
  return invokeApiCall({
    endPoint: BASE_URL + CASE_DEFINITION + `/${id}`,
    apiParams: {},
    requestType: GET,
    setAccessToken: true,
  }).then(
    ({
      success,
      data: responseData,
      showInlineAlerts = false,
      errors,
    } = {}) => {
      if (success) {
        return { success, data: responseData };
      }
      return { success, errors, showInlineAlerts };
    }
  );
}

export function getHistoryCaseInstance(id) {
  return invokeApiCall({
    endPoint: BASE_URL + HISTORY_CASE_INSTANCE + `/${id}`,
    apiParams: {},
    requestType: GET,
    setAccessToken: true,
  }).then(
    ({
      success,
      data: responseData,
      showInlineAlerts = false,
      errors,
    } = {}) => {
      if (success) {
        return { success, data: responseData };
      }
      return { success, errors, showInlineAlerts };
    }
  );
}

export function getCaseInstance(id) {
  return invokeApiCall({
    endPoint: BASE_URL + CASE_INSTANCE + `/${id}`,
    apiParams: {},
    requestType: GET,
    setAccessToken: true,
  }).then(
    ({
      success,
      data: responseData,
      showInlineAlerts = false,
      errors,
    } = {}) => {
      if (success) {
        return { success, data: responseData };
      }
      return { success, errors, showInlineAlerts };
    }
  );
}

export function getCaseVariables(id) {
  return invokeApiCall({
    endPoint: BASE_URL + CASE_INSTANCE + `/${id}/variables`,
    apiParams: {},
    requestType: GET,
    setAccessToken: true,
  }).then(
    ({
      success,
      data: responseData,
      showInlineAlerts = false,
      errors,
    } = {}) => {
      if (success) {
        return { success, data: responseData };
      }
      return { success, errors, showInlineAlerts };
    }
  );
}

export function getTaskForm(id) {
  return invokeApiCall({
    endPoint: GATEWAY_URL + RUNTIME_FORM + `${id}`,
    apiParams: {},
    requestType: GET,
    setAccessToken: false,
  }).then(
    ({
      success,
      data: responseData,
      showInlineAlerts = false,
      errors,
    } = {}) => {
      if (success) {
        return { success, data: responseData };
      }
      return { success, errors, showInlineAlerts };
    }
  );
}

export function getFormVariables(id) {
  return invokeApiCall({
    endPoint: GATEWAY_URL + WORKFLOW + `/${id}` + FORM_VARIABLES,
    apiParams: {},
    requestType: GET,
    setAccessToken: false,
  }).then(
    ({
      success,
      data: responseData,
      showInlineAlerts = false,
      errors,
    } = {}) => {
      if (success) {
        return { success, data: responseData };
      }
      return { success, errors, showInlineAlerts };
    }
  );
}

export function saveTaskForm(taskId, data) {
  let reBody = {
    taskId,
    variables: data,
  };
  return invokeApiCall({
    endPoint: `${GATEWAY_URL}${SUBMIT_TASK}`,
    apiParams: reBody,
    requestType: POST,
    setAccessToken: false,
  }).then(
    ({
      success,
      data: responseData,
      showInlineAlerts = false,
      errors,
    } = {}) => {
      if (success) {
        return { success, data: responseData };
      }
      return { success, errors, showInlineAlerts };
    }
  );
}

export function completeTask(id) {
  return invokeApiCall({
    endPoint: BASE_URL + `/task/${id}/complete`,
    apiParams: {},
    requestType: POST,
    setAccessToken: true,
  }).then(
    ({
      success,
      data: responseData,
      showInlineAlerts = false,
      errors,
    } = {}) => {
      if (success) {
        return { success, data: responseData };
      }
      return { success, errors, showInlineAlerts };
    }
  );
}

export function claimTask(id, body) {
  return invokeApiCall({
    endPoint: GATEWAY_URL + `/workflow/v1/engine-rest/task/{id}/claim`,
    apiParams: body,
    requestType: POST,
    setAccessToken: true,
  }).then(
    ({
      success,
      data: responseData,
      showInlineAlerts = false,
      errors,
    } = {}) => {
      if (success) {
        return { success, data: responseData };
      }
      return { success, errors, showInlineAlerts };
    }
  );
}

export function getCommentsList(id) {
  return invokeApiCall({
    endPoint: GATEWAY_URL + WORKFLOW_COMMENTS + { id },
    apiParams: {},
    requestType: GET,
    setAccessToken: true,
  }).then(
    ({
      success,
      data: responseData,
      showInlineAlerts = false,
      errors,
    } = {}) => {
      if (success) {
        return { success, data: responseData };
      }
      return { success, errors, showInlineAlerts };
    }
  );
}

export function getQuoteSummary() {
  // return quoteSummaryApiResponse;
  return new Promise((resolve, reject) => {
    resolve(quoteSummaryApiResponse);
  });
  // return invokeApiCall({
  //   endPoint: BASE_URL + `/task/${id}/comment`,
  //   apiParams: {},
  //   requestType: GET,
  //   setAccessToken: true
  // }).then(({ success, data: responseData, showInlineAlerts = false, errors } = {}) => {
  //   if (success) {
  //     return { success, data: responseData };
  //   }
  //   return { success, errors, showInlineAlerts };
  // });
}

export function createComment(id, data) {
  return invokeApiCall({
    endPoint: GATEWAY_URL + `/workflow/v1/comments`,
    apiParams: data,
    requestType: POST,
    setAccessToken: true,
  }).then(
    ({
      success,
      data: responseData,
      showInlineAlerts = false,
      errors,
    } = {}) => {
      if (success) {
        return { success, data: responseData };
      }
      return { success, errors, showInlineAlerts };
    }
  );
}

export function manualStartActiviti(id, data) {
  return invokeApiCall({
    endPoint: BASE_URL + CASE_EXECUTION + `/${id}/manual-start`,
    apiParams: data,
    requestType: POST,
    setAccessToken: true,
  }).then(
    ({
      success,
      data: responseData,
      showInlineAlerts = false,
      errors,
    } = {}) => {
      if (success) {
        return { success, data: responseData };
      }
      return { success, errors, showInlineAlerts };
    }
  );
}

export function getCaseActivitiTasks(id) {
  return invokeApiCall({
    endPoint: BASE_URL + CASE_ACTIVITI_TASKS + `${id}`,
    apiParams: {},
    requestType: GET,
    setAccessToken: true,
  }).then(
    ({
      success,
      data: responseData,
      showInlineAlerts = false,
      errors,
    } = {}) => {
      if (success) {
        return { success, data: responseData };
      }
      return { success, errors, showInlineAlerts };
    }
  );
}
