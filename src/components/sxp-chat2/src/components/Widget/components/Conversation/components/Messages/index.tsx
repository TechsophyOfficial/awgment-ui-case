import React, { useEffect, useRef, useState, ElementRef, ImgHTMLAttributes, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import format from 'date-fns/format';

import { scrollToBottom } from '../../../../../../utils/messages';
import { Message, Link, CustomCompMessage, GlobalState } from '../../../../../../store/types';
import { setBadgeCount, markAllMessagesRead } from '../../../../../../store/actions';

import Loader from './components/Loader';
import './styles.scss';

type Props = {
  showTimeStamp: boolean,
  profileAvatar?: string;
  chatId: string;
}

function Messages({ profileAvatar, showTimeStamp, chatId }: Props) {
  const dispatch = useDispatch();
  const { messages, typing, showChat, badgeCount } = useSelector((state: GlobalState) => ({
    messages: state.messages[chatId]?.messages,
    badgeCount: state.messages[chatId]?.badgeCount,
    typing: state.behavior[chatId].messageLoader,
    showChat: state.behavior[chatId].showChat
  }));

  const messageRef = useRef<HTMLDivElement | null>(null);
  const state = useSelector((state: GlobalState) => ({
    state: state
  }));
  useEffect(() => {
    // @ts-ignore
    scrollToBottom(messageRef.current);
    if (showChat && badgeCount) dispatch(markAllMessagesRead(chatId));
    else {
      if (messages) {
        dispatch(setBadgeCount(messages.filter((message) => message.unread).length, chatId));
      } else {
        dispatch(setBadgeCount(0, chatId));
      }

    }

  }, [messages, badgeCount, showChat]);

  const getComponentToRender = (message: Message | Link | CustomCompMessage) => {
    const ComponentToRender = message.component;
    if (message.type === 'component') {
      return <ComponentToRender {...message.props} />;
    }
    return <ComponentToRender message={message} showTimeStamp={showTimeStamp} />;
  };

  // TODO: Fix this function or change to move the avatar to last message from response
  // const shouldRenderAvatar = (message: Message, index: number) => {
  //   const previousMessage = messages[index - 1];
  //   if (message.showAvatar && previousMessage.showAvatar) {
  //     dispatch(hideAvatar(index));
  //   }
  // }

  return (
    <div id="messages" className="rcw-messages-container" ref={messageRef}>
      {messages?.map((message, index) =>
        message.text ?  <div className="rcw-message" key={`${index}-${format(message.timestamp, 'hh:mm')}`}>
          {profileAvatar &&
            message.showAvatar &&
            <img src={profileAvatar} className="rcw-avatar" alt="profile" />
          }
          {getComponentToRender(message)}
        </div> : ''
      )}
      <Loader typing={typing} />
    </div>
  );
}

export default Messages;
