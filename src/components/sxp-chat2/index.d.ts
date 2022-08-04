// Type definitions for react-chat-widget v3.0.0
// Project: <https://github.com/Wolox/react-chat-widget>
// Definitions by: Martín Callegari <https://github.com/mcallegari10>

import { ElementType } from 'react';

declare const Widget: ElementType;

// export function addUserMessage(text: string): void;
export function addUserMessage(text: string, timeStamp : Date, widgetId: string, id?: string): void;

// export function addResponseMessage(text: string): void;
export function addResponseMessage(text: string, timeStamp : Date, widgetId: string, id?: string): void;

// export function addLinkSnippet(link: { link: string, title: string, target?: string }): void;
export function addLinkSnippet(link: { link: string, title: string, target?: string }, widgetId: string, id?: string): void;

export function renderCustomComponent(component: ElementType, props: any): void;
export function renderCustomComponent(component: ElementType, props: any, showAvatar: boolean): void;
export function renderCustomComponent(component: ElementType, props: any, showAvatar: boolean, id: string): void;
export function renderCustomComponent(component: ElementType, props: any, showAvatar: boolean, widgetId: string, id: string): void;

export function toggleMsgLoader(widgetId: string): void;
export function toggleWidget(toggleWidget: string): void;
export function toggleInputDisabled(widgetId: string): void;
export function dropMessages(widgetId: string): void;
export function isWidgetOpened(): boolean;
export function setQuickButtons(buttons: Array<{ label: string, value: string | number }>, widgetId: string): void;

export function deleteMessages(count: number): void;
export function deleteMessages(count: number, widgetId: string, id?: string): void;

export function markAllAsRead(): void;
export function setBadgeCount(count: number, widgetId: string): void;

export as namespace ReactChatWidget;
