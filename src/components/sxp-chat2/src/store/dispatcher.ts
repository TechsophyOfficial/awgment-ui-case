import { ElementType } from 'react';

import store from '.';
import * as actions from './actions';
import { LinkParams, ImageState } from './types';

export function addUserMessage(text: string, timeStamp: Date, widgetId: string, id?: string) {
  store.dispatch(actions.addUserMessage(text, timeStamp, widgetId, id));
}

export function addResponseMessage(text: string, timeStamp: Date, widgetId: string, id?: string) {
  store.dispatch(actions.addResponseMessage(text, timeStamp, widgetId, id));
}

export function addLinkSnippet(link: LinkParams, widgetId: string, id?: string) {
  store.dispatch(actions.addLinkSnippet(link, widgetId, id));
}

export function toggleMsgLoader(widgetId: string) {
  store.dispatch(actions.toggleMsgLoader(widgetId));
}

export function renderCustomComponent(component: ElementType, props: any, showAvatar = false, widgetId: string, id?: string) {
  store.dispatch(actions.renderCustomComponent(component, props, showAvatar, widgetId, id));
}

export function toggleWidget(widgetId: string) {
  store.dispatch(actions.toggleChat(widgetId));
}

export function toggleInputDisabled(widgetId: string) {
  store.dispatch(actions.toggleInputDisabled(widgetId));
}

export function dropMessages(widgetId: string) {
  store.dispatch(actions.dropMessages(widgetId));
}

export function isWidgetOpened(): boolean {
  return store.getState().behavior.showChat;
}

export function setQuickButtons(buttons: Array<{ label: string, value: string | number }>, widgetId: string) {
  store.dispatch(actions.setQuickButtons(buttons, widgetId));
}

export function deleteMessages(count: number, widgetId: string, id?: string) {
  store.dispatch(actions.deleteMessages(count, widgetId, id));
}

export function markAllAsRead(widgetId: string) {
  store.dispatch(actions.markAllMessagesRead(widgetId));
}

export function setBadgeCount(count: number, widgetId: string) {
  store.dispatch(actions.setBadgeCount(count, widgetId));
}

export function openFullscreenPreview(payload: ImageState) {
  store.dispatch(actions.openFullscreenPreview(payload));
}

export function closeFullscreenPreview() {
  store.dispatch(actions.closeFullscreenPreview());
}
