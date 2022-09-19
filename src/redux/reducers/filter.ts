import { REFRESH_FILTER_LIST } from "../actionTypes";

const initialState = {
  refresh: false
};

export default function(state = initialState , action) {
  switch (action.type) {
    case REFRESH_FILTER_LIST: {
      const { content } = action.payload;
      return {
        ...state    ,
        refresh : content   
      };
    }
    default:
      return state;
  }
}
