import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { GlobalState } from '../../../../../../../src/store/types';
import MailIcon from '../../../../../../../assets/MailIcon';
import DownArrowIcon from '../../../../../../../assets/downArrowIcon';

import './style.scss';
import { Button, Icon } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DescIcon from '../../../../../../../assets/DescIcon';
import Forward from '../../../../../../../assets/Forward';
import BagIcon from '../../../../../../../assets/Bag';
import PersonIcon from '../../../../../../../assets/Person';

import VariablesDialog from './variablesDialog'


const send = require('../../../../../../../assets/send_button.svg') as string;
const upload = require('../../../../../../../assets/file_upload.svg') as string;
const restart = require('../../../../../../../assets/restart.svg') as string;
const editInput = require('../../../../../../../assets/edit-input.svg') as string;


type Props = {
  placeholder: string;
  disabledInput: boolean;
  autofocus: boolean;
  sendMessage: (event: any) => void;
  buttonAlt: string;
  chatId: string;
  onTextInputChange?: (event: any) => void;
  onFileUpload?: (event: any) => void;
  onRestart?: (event: any) => void;
  onEdit?: (event: any) => void;
  onMailOptionSubmit: (event: any) => void;
  caseDetails?: any
}

function Sender({ sendMessage, placeholder, disabledInput, autofocus, onTextInputChange, chatId, buttonAlt, onFileUpload, onRestart, onEdit, onMailOptionSubmit, caseDetails }: Props) {
  const showChat = useSelector((state: GlobalState) => state.behavior[chatId].showChat);
  const inputRef = useRef(null);
  const [menu, setMenu] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [configJson, setConfigJson] = React.useState(null);
  const [templateList, setTemplateList] = React.useState([]);
  const [dialogData, setDialogData] = React.useState({ name: '', variablesList: [], journeyName: '',negotiationIteration: '' });


  // @ts-ignore
  useEffect(() => { if (showChat) inputRef.current?.focus(); }, [showChat]);

  useEffect(() => {
    let config = JSON.parse(sessionStorage.getItem('config') || '{}');
    setConfigJson(config);
    setTemplateList(config ? 
      (config.journey_templates ? config.journey_templates[chatId] : []) 
      : []);
  }, [])


  function handleClick(event: any) {
    setMenu(event.currentTarget);
  };

  function handleClickOpen(event: any, value: any) {
    setMenu(event.currentTarget);
    setDialogData({ name: value.name, variablesList: value.variables, negotiationIteration: value.negotiationIteration, journeyName: value.journeyName })
    setOpen(true);
  }

  function handleClose() {
    setMenu(null);
  }

  function handleDClose() {
    setOpen(false);
  };

  function submitTemplateRequest(event) {
    onMailOptionSubmit(event);
    setOpen(false);
    setMenu(null);
  }

  return (
    <form className="rcw-sender" onSubmit={sendMessage}>
      {/* <div className="rcw-send">
        <img src={restart} className="rcw-send-icon" onClick={onRestart} alt="restart chat" />
      </div> */}
      <input
        type="text"
        className="rcw-new-message"
        name="message"
        ref={inputRef}
        placeholder={placeholder}
        disabled={disabledInput}
        autoFocus={autofocus}
        autoComplete="off"
        onChange={onTextInputChange}
      />
      {/* <div className="rcw-send">
        <img src={editInput} className="rcw-send-icon" onClick={onEdit} alt="Edit Input" />
      </div>
      <div className="rcw-send">
        <label htmlFor="file-input">
          <img src={upload} className="rcw-send-icon" alt="File Input" />
        </label>
        <input id="file-input" type="file" onChange={onFileUpload} style={{ display: 'none' }} />
      </div> */}

      <div>
        <Button className="sc-user-input--button" aria-haspopup="true" onClick={handleClick}>
          <MailIcon />
          <DownArrowIcon />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={menu}
          keepMounted
          open={Boolean(menu)}
          onClose={handleClose}
          className={'mail-menu'}
        >
          {templateList && templateList.map((value: any, index) => {
            return (
              <MenuItem key={value.name} onClick={(event) => handleClickOpen(event, value)}
              //  onMouseEnter={(e) => e.target.style.backgroundColor = theme.palette.primary.main}
              // onMouseLeave={(e) => e.target.style.color = theme.palette.secondary.main}
              >
                <div className={'sc-mail-popup'}>
                  {/* <span><DescIcon /></span> */}
                  <Icon>{value.icon}</Icon>
                  <span>{value.name}</span>
                </div>
              </MenuItem>
            )
          })}

        </Menu>
      </div>
      <button type="submit" className="rcw-send">
        <img src={send} className="rcw-send-icon" alt={buttonAlt} />
      </button>
      <VariablesDialog
        isOpen={open}
        dialogData={dialogData}
        closeDialog={() => setOpen(false)}
        onMailOptionSubmit={(event) => submitTemplateRequest(event)}
        caseInstanceId={caseDetails ? caseDetails.id : null} />
    </form>
  );
}

export default Sender;
