import { MessagesState } from '../types';

import { createReducer } from '../../utils/createReducer';
import { createNewMessage, createLinkSnippet, createComponentMessage } from '../../utils/messages';
import { MESSAGE_SENDER } from '../../constants';
import {
  MessagesActions,
  ADD_NEW_USER_MESSAGE,
  ADD_NEW_RESPONSE_MESSAGE,
  ADD_NEW_LINK_SNIPPET,
  ADD_COMPONENT_MESSAGE,
  DROP_MESSAGES,
  HIDE_AVATAR,
  DELETE_MESSAGES,
  MARK_ALL_READ,
  SET_BADGE_COUNT
} from '../actions/types';

// const initialState = {
//   messages: [],
//   badgeCount: 0
// };

const messagesReducer = {
  [ADD_NEW_USER_MESSAGE]: (state: MessagesState, { text, timeStamp, widgetId, id }) => ({ ...state, [widgetId]: { ...state[widgetId], messages: [...(state[widgetId] ? state[widgetId].messages : []), createNewMessage(text, MESSAGE_SENDER.CLIENT, timeStamp, id)] } }),

  [ADD_NEW_RESPONSE_MESSAGE]: (state: any, { text, timeStamp, id, widgetId }) => ({ ...state, [widgetId]: { messages: [...(state[widgetId] ? state[widgetId]?.messages : []), createNewMessage(text, MESSAGE_SENDER.RESPONSE, timeStamp, id)], badgeCount: state[widgetId]?.badgeCount ? state[widgetId]?.badgeCount + 1 : 1 } }),

  [ADD_NEW_LINK_SNIPPET]: (state: any, { link, id, widgetId }) => ({ ...state, [widgetId]: { ...state[widgetId], messages: [...state[widgetId]?.messages, createLinkSnippet(link, id)] } }),

  [ADD_COMPONENT_MESSAGE]: (state: MessagesState, { component, props, showAvatar, id, widgetId }) =>
    ({ ...state, [widgetId]: { ...state[widgetId], messages: [...state[widgetId]?.messages, createComponentMessage(component, props, showAvatar, id)] } }),

  [DROP_MESSAGES]: (state: MessagesState, { widgetId }) =>
    ({ ...state, [widgetId]: { ...state[widgetId], messages: [] } }),

  [HIDE_AVATAR]: (state: MessagesState, { index, widgetId }) => state[widgetId].messages[index].showAvatar = false,

  [DELETE_MESSAGES]: (state: MessagesState, { count, id, widgetId }) => ({
    ...state,
    [widgetId]: {
      ...state[widgetId],
      messages: id ?
        state[widgetId].messages?.filter(message => message.customId !== id) :
        state[widgetId].messages?.splice(state[widgetId].messages.length - 1, count)
    }
  }),

  [SET_BADGE_COUNT]: (state: MessagesState, { count, widgetId }) => ({ ...state, [widgetId]: { ...state[widgetId], badgeCount: count } }),

  [MARK_ALL_READ]: (state: MessagesState, { widgetId }) =>
    ({ ...state, [widgetId]: { ...state[widgetId], messages: state[widgetId].messages?.map(message => ({ ...message, unread: false })), badgeCount: 0 } })
}

export default (state = {}, action: MessagesActions) => createReducer(messagesReducer, state, action);
