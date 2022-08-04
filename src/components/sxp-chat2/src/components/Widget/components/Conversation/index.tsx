import React, { useEffect } from 'react';
import cn from 'classnames';

import Header from './components/Header';
import Messages from './components/Messages';
import Sender from './components/Sender';
import QuickButtons from './components/QuickButtons';

import { AnyFunction } from '../../../../utils/types';

import './style.scss';

type Props = {
  title: string;
  subtitle: string;
  senderPlaceHolder: string;
  chatId: string;
  showCloseButton: boolean;
  disabledInput: boolean;
  autofocus: boolean;
  className: string;
  sendMessage: AnyFunction;
  toggleChat: AnyFunction;
  profileAvatar?: string;
  titleAvatar?: string;
  onQuickButtonClicked?: AnyFunction;
  onFileUpload?: (event: any) => void;
  onRestart?: (event: any) => void;
  onEdit?: (event: any) => void;
  onTextInputChange?: (event: any) => void;
  onMailOptionSubmit : (event : any) => void;
  sendButtonAlt: string;
  showTimeStamp: boolean;
  caseDetails?:any
};

function Conversation({
  title,
  subtitle,
  senderPlaceHolder,
  showCloseButton,
  disabledInput,
  autofocus,
  className,
  sendMessage,
  toggleChat,
  profileAvatar,
  titleAvatar,
  chatId,
  onQuickButtonClicked,
  onTextInputChange,
  onFileUpload,
  sendButtonAlt,
  onRestart,
  onEdit,
  onMailOptionSubmit,
  showTimeStamp,
  caseDetails
}: Props) {

  return (
    <div className={cn('rcw-conversation-container', className)} aria-live="polite">
      <Header
        title={title}
        subtitle={subtitle}
        toggleChat={toggleChat}
        showCloseButton={showCloseButton}
        titleAvatar={titleAvatar}
      />
      <Messages chatId={chatId} profileAvatar={profileAvatar} showTimeStamp={showTimeStamp} />
      <QuickButtons chatId={chatId} onQuickButtonClicked={onQuickButtonClicked} />
      <Sender
        chatId={chatId}
        sendMessage={sendMessage}
        placeholder={senderPlaceHolder}
        disabledInput={disabledInput}
        autofocus={autofocus}
        onTextInputChange={onTextInputChange}
        onFileUpload={onFileUpload}
        onRestart={onRestart}
        onEdit={onEdit}
        buttonAlt={sendButtonAlt}
        onMailOptionSubmit = {(e) => onMailOptionSubmit(e)}
        caseDetails={caseDetails}
      />
    </div>
  );
}

export default Conversation;
