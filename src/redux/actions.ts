import { REFRESH_FILTER_LIST } from "./actionTypes";

export const refreshFilters = content => ({
  type: REFRESH_FILTER_LIST,
  payload: {
    content
  }
});
