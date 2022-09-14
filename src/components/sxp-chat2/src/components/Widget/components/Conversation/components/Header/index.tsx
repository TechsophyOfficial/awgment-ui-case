import React from 'react';
import './style.scss';
import personIcon from '../../../../../../../assets/person.png';

type Props = {
  title: string;
  subtitle: string;
  toggleChat: () => void;
  showCloseButton: boolean;
  titleAvatar?: string;
}

function Header({ title, subtitle, toggleChat, showCloseButton, titleAvatar }: Props) {
  return (
    <div className="rcw-header">
      {/* {showCloseButton &&
        <button className="rcw-close-button" onClick={toggleChat}>
          <img src={close} className="rcw-close" alt="close" />
        </button>
      } */}
      <div>
        <h5 className="rcw-title">
          {titleAvatar && <img src={titleAvatar} className="avatar" alt="profile" />}
          {title}#
        <br></br>
          <span>{subtitle}</span>
        </h5>

      </div>


      <div className="sc-header--close-button">
        <img src={personIcon} alt="" />
      </div>
    </div>
  );
}

export default Header;
