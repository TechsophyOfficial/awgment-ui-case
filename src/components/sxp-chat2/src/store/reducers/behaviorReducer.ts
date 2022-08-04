import { createReducer } from '../../utils/createReducer';
import { BehaviorState } from '../types';

import {
  BehaviorActions,
  TOGGLE_CHAT,
  TOGGLE_INPUT_DISABLED,
  TOGGLE_MESSAGE_LOADER,
  INIT_STATE
} from '../actions/types';

const initialState = {
  showChat: false,
  disabledInput: false,
  messageLoader: false
};

const behaviorReducer = {
  [INIT_STATE]: (state: BehaviorState, { chatId }) => ({ ...state, [chatId]: { ...initialState } }),
  [TOGGLE_CHAT]: (state: BehaviorState, { widgetId }) => ({ ...state, [widgetId]: { ...state[widgetId], showChat: !state[widgetId].showChat } }),

  [TOGGLE_INPUT_DISABLED]: (state: BehaviorState, { widgetId }) => ({ ...state, [widgetId]: { ...state[widgetId], disabledInput: !state[widgetId].disabledInput } }),

  [TOGGLE_MESSAGE_LOADER]: (state: BehaviorState, { widgetId }) => ({ ...state, [widgetId]: { ...state[widgetId], messageLoader: !state[widgetId].messageLoader } })
};

export default (state: BehaviorState = {} as any, action: BehaviorActions) => {
  return createReducer(behaviorReducer, state, action)
};
