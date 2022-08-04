import React from 'react';
import format from 'date-fns/format';
import markdownIt from 'markdown-it';
import markdownItSup from 'markdown-it-sup';
import markdownItSanitizer from 'markdown-it-sanitizer';
import markdownItClass from '@toycode/markdown-it-class';
import markdownItLinkAttributes from 'markdown-it-link-attributes';

import { Message as Msg } from '../../../../../../../../store/types';
import chatIconUrl from '../../../../../../../../../assets/person.png';

import './styles.scss';

type Props = {
  message: Msg;
  showTimeStamp: boolean;
}

function Message({ message, showTimeStamp }: Props) {
  const sanitizedHTML = markdownIt()
    .use(markdownItClass, {
      img: ['rcw-message-img']
    })
    .use(markdownItSup)
    .use(markdownItSanitizer)
    .use(markdownItLinkAttributes, { attrs: { target: '_blank', rel: 'noopener' } })
    .render(message.text ? message.text : '  ');


  return (
    <div className={`rcw-${message.sender}`}>
      {(message.sender == 'response') && <div className="sc-message--avatar" style={{
        backgroundImage: `url(${chatIconUrl})`
      }}></div>}

      {showTimeStamp && (message.sender == 'client') && <span className="rcw-timestamp">{format(message.timestamp, 'hh:mm aa')}</span>}

      <div className="rcw-message-text" dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
      {showTimeStamp && (message.sender == 'response') && <span className="rcw-timestamp">{format(message.timestamp, 'hh:mm aa')}</span>}

      {(message.sender == 'client') && <div className="sc-message--avatar" style={{
        backgroundImage: `url(${chatIconUrl})`
      }}></div>}
    </div>
  );
}

export default Message;
