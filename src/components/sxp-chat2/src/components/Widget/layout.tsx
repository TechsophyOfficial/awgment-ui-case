import React,{ useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import { GlobalState } from '../../../src/store/types';
import { AnyFunction } from '../../../src/utils/types';
import { openFullscreenPreview } from '../../store/actions';

import Conversation from './components/Conversation';
import Launcher from './components/Launcher';
import FullScreenPreview from './components/FullScreenPreview';

import './style.scss';

type Props = {
  title: string;
  titleAvatar?: string;
  subtitle: string;
  onSendMessage: AnyFunction;
  onToggleConversation: AnyFunction;
  senderPlaceHolder: string;
  onQuickButtonClicked: AnyFunction;
  onFileUpload?: (event: any) => void;
  onRestart?: (event: any) => void;
  onEdit?: (event: any) => void;
  profileAvatar?: string;
  showCloseButton: boolean;
  fullScreenMode: boolean;
  autofocus: boolean;
  customLauncher?: AnyFunction;
  onTextInputChange?: (event: any) => void;
  chatId: string;
  launcherOpenLabel: string;
  launcherCloseLabel: string;
  sendButtonAlt: string;
  showTimeStamp: boolean;
  imagePreview?: boolean;
  zoomStep?: number;
  onMailOptionSubmit: (event : any) => void;
  caseDetails? : any
}

function WidgetLayout({
  title,
  titleAvatar,
  subtitle,
  onSendMessage,
  onToggleConversation,
  senderPlaceHolder,
  onQuickButtonClicked,
  profileAvatar,
  showCloseButton,
  fullScreenMode,
  autofocus,
  customLauncher,
  onTextInputChange,
  onFileUpload,
  chatId,
  launcherOpenLabel,
  launcherCloseLabel,
  sendButtonAlt,
  showTimeStamp,
  imagePreview,
  zoomStep,
  onRestart,
  onEdit,
  onMailOptionSubmit,
  caseDetails
}: Props) {
  const dispatch = useDispatch();
  const { disableInput, showChat, visible } = useSelector((state: GlobalState) => ({
    showChat: state.behavior[chatId]?.showChat,
    disableInput: state.behavior[chatId]?.disabledInput,
    visible: state.preview.visible,
  }));

  const messageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (showChat) {
      messageRef.current = document.getElementById('messages') as HTMLDivElement;
    }
    return () => {
      messageRef.current = null;
    }
  }, [showChat])

  const eventHandle = evt => {
    if (evt.target && evt.target.className === 'rcw-message-img') {
      const { src, alt, naturalWidth, naturalHeight } = (evt.target as HTMLImageElement);
      const obj = {
        src: src,
        alt: alt,
        width: naturalWidth,
        height: naturalHeight,
      };
      dispatch(openFullscreenPreview(obj))
    }
  }

  /**
   * Previewer needs to prevent body scroll behavior when fullScreenMode is true
   */
  useEffect(() => {
    const target = messageRef?.current;
    if (imagePreview && showChat) {
      target?.addEventListener('click', eventHandle, false);
    }

    return () => {
      target?.removeEventListener('click', eventHandle);
    }
  }, [imagePreview, showChat]);

  useEffect(() => {
    document.body.setAttribute('style', `overflow: ${visible || fullScreenMode ? 'hidden' : 'auto'}`)
  }, [fullScreenMode, visible])

  return (
    <div
      className={cn('rcw-widget-container', {
        'rcw-full-screen': fullScreenMode,
        'rcw-previewer': imagePreview
      })
      }
    >
      {showChat &&
        <Conversation
          title={title}
          subtitle={subtitle}
          sendMessage={onSendMessage}
          senderPlaceHolder={senderPlaceHolder}
          profileAvatar={profileAvatar}
          toggleChat={onToggleConversation}
          showCloseButton={showCloseButton}
          disabledInput={disableInput}
          autofocus={autofocus}
          chatId={chatId}
          titleAvatar={titleAvatar}
          className={'active'}
          onQuickButtonClicked={onQuickButtonClicked}
          onTextInputChange={onTextInputChange}
          sendButtonAlt={sendButtonAlt}
          showTimeStamp={showTimeStamp}
          onFileUpload={onFileUpload}
          onRestart={onRestart}
          onEdit={onEdit}
          onMailOptionSubmit={(e) => onMailOptionSubmit(e)}
          caseDetails={caseDetails}
        />
     }
      {customLauncher ?
        customLauncher(onToggleConversation) :
        !fullScreenMode && <div></div>
        // <Launcher
        //   toggle={onToggleConversation}
        //   chatId={chatId}
        //   openLabel={launcherOpenLabel}
        //   closeLabel={launcherCloseLabel}
        // />
      }
      {
        imagePreview && <FullScreenPreview fullScreenMode={fullScreenMode} zoomStep={zoomStep} />
      }
    </div>
  );
}

export default WidgetLayout;