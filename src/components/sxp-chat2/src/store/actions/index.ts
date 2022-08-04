import { ElementType } from 'react';

import * as actionsTypes from './types';
import { LinkParams, ImageState } from '../types';

export function toggleChat(widgetId: string): actionsTypes.ToggleChat {
  return {
    type: actionsTypes.TOGGLE_CHAT,
    widgetId
  };
}

export function toggleInputDisabled(widgetId: string): actionsTypes.ToggleInputDisabled {
  return {
    type: actionsTypes.TOGGLE_INPUT_DISABLED,
    widgetId
  };
}
export function addUserMessage(text: string,timeStamp: Date, widgetId: string, id?: string): actionsTypes.AddUserMessage {
  return {
    type: actionsTypes.ADD_NEW_USER_MESSAGE,
    text,
    timeStamp,
    widgetId,
    id   
  };
}

export function addResponseMessage(text: string,timeStamp: Date, widgetId: string, id?: string): actionsTypes.AddResponseMessage {
  return {
    type: actionsTypes.ADD_NEW_RESPONSE_MESSAGE,
    text,
    timeStamp,
    widgetId,
    id
  };
}

export function toggleMsgLoader(widgetId: string): actionsTypes.ToggleMsgLoader {
  return {
    type: actionsTypes.TOGGLE_MESSAGE_LOADER,
    widgetId
  }
}

export function addLinkSnippet(link: LinkParams, widgetId: string, id?: string): actionsTypes.AddLinkSnippet {
  return {
    type: actionsTypes.ADD_NEW_LINK_SNIPPET,
    link,
    id,
    widgetId
  };
}

export function renderCustomComponent(
  component: ElementType,
  props: any,
  showAvatar: boolean,
  widgetId: string,
  id?: string
): actionsTypes.RenderCustomComponent {
  return {
    type: actionsTypes.ADD_COMPONENT_MESSAGE,
    component,
    props,
    showAvatar,
    widgetId,
    id
  };
}

export function dropMessages(widgetId: string): actionsTypes.DropMessages {
  return {
    type: actionsTypes.DROP_MESSAGES,
    widgetId,
  };
}

export function hideAvatar(index: number, widgetId: string): actionsTypes.HideAvatar {
  return {
    type: actionsTypes.HIDE_AVATAR,
    index,
    widgetId
  };
}

export function setQuickButtons(buttons: Array<{ label: string, value: string | number }>, widgetId: string): actionsTypes.SetQuickButtons {
  return {
    type: actionsTypes.SET_QUICK_BUTTONS,
    buttons,
    widgetId
  }
}

export function deleteMessages(count: number, widgetId: string, id?: string): actionsTypes.DeleteMessages {
  return {
    type: actionsTypes.DELETE_MESSAGES,
    count,
    widgetId,
    id
  }
}

export function setBadgeCount(count: number, widgetId: string): actionsTypes.SetBadgeCount {
  return {
    type: actionsTypes.SET_BADGE_COUNT,
    count,
    widgetId
  }
}

export function markAllMessagesRead(widgetId: string): actionsTypes.MarkAllMessagesRead {
  return {
    type: actionsTypes.MARK_ALL_READ,
    widgetId
  }
}

export function openFullscreenPreview(payload: ImageState): actionsTypes.FullscreenPreviewActions {
  return {
    type: actionsTypes.OPEN_FULLSCREEN_PREVIEW,
    payload
  };
}

export function closeFullscreenPreview(): actionsTypes.FullscreenPreviewActions {
  return {
    type: actionsTypes.CLOSE_FULLSCREEN_PREVIEW
  };
}
