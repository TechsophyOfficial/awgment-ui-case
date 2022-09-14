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
  RUNTIME_FORM,
  FORM_VARIABLES,
  SUBMIT_TASK,
} from "src/constants/endpoints";
import { quoteSummaryApiResponse } from "src/mocks/quoteSummary";

// import { SET_MASTER_LIST } from 'constants/master';
// import { SET_FORM_VALUES } from 'constants/bookAnAppointment';
// import { LOCALE_DATA, ACCESS_TOKEN } from 'constants/common';

// import Cookies from 'helpers/Cookies';

// const BASE_URL = `${process.env.REACT_APP_SERVER_URL}`;
// const GATEWAY_URL = `${process.env.REACT_APP_API_GATEWAY_URL}`;

// const BASE_URL = `${appData.apiServerURL}`;
// const GATEWAY_URL = `${appData.apiGatewayUrl}`;

export function getTask(BASE_URL, taskId) {
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

export function getFilterList(BASE_URL) {
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

export function getFilter(filterId, GATEWAY_URL) {
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

export function createFilter(data, GATEWAY_URL) {
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

export function updateFilter(id, data, BASE_URL) {
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

export function deleteFilter(filterId, BASE_URL) {
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

export function getFilterTasksCount(filterId, data, GATEWAY_URL) {
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

export function getFilterTasks(filterId, data, queryParam, BASE_URL) {
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

export function getCaseDefinition(id, BASE_URL) {
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

// export function getHistoryCaseInstance(id) {
//   return invokeApiCall({
//     endPoint: BASE_URL + HISTORY_CASE_INSTANCE + `/${id}`,
//     apiParams: {},
//     requestType: GET,
//     setAccessToken: true,
//   }).then(
//     ({
//       success,
//       data: responseData,
//       showInlineAlerts = false,
//       errors,
//     } = {}) => {
//       if (success) {
//         return { success, data: responseData };
//       }
//       return { success, errors, showInlineAlerts };
//     }
//   );
// }

export function getCaseInstance(id, BASE_URL) {
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

export function getCaseVariables(id, BASE_URL) {
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

export function getTaskForm(id, GATEWAY_URL) {
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

export function getFormVariables(id, GATEWAY_URL) {
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

export function saveTaskForm(taskId, data, GATEWAY_URL) {
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

export function completeTask(id, BASE_URL) {
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

export function claimTask(id, body, GATEWAY_URL) {
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

// export function getCommentsList(id, GATEWAY_URL) {
//   return invokeApiCall({
//     endPoint: GATEWAY_URL + WORKFLOW_COMMENTS + { id },
//     apiParams: {},
//     requestType: GET,
//     setAccessToken: true,
//   }).then(
//     ({
//       success,
//       data: responseData,
//       showInlineAlerts = false,
//       errors,
//     } = {}) => {
//       if (success) {
//         return { success, data: responseData };
//       }
//       return { success, errors, showInlineAlerts };
//     }
//   );
// }

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

export function createComment(id, data, GATEWAY_URL) {
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

export function manualStartActiviti(id, data, BASE_URL) {
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

export function getCaseActivitiTasks(id, BASE_URL) {
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
