import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SendIcon from './icons/SendIcon';
import FileIcon from './icons/FileIcon';
import EmojiIcon from './icons/EmojiIcon';
import PopupWindow from './popups/PopupWindow';
import EmojiPicker from './emoji-picker/EmojiPicker';
import MailIcon from './icons/MailIcon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from '@material-ui/core';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from "@material-ui/core/styles";
import DescIcon from './icons/DescIcon';
import Forward from './icons/Forward';
import BagIcon from './icons/Bag';
import PersonIcon from './icons/Person';
import AppConfig from '../../appConfig';

const appData = React.useContext(AppConfig);


const styles = theme => ({
  menu: {
    "&>*": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.text.header,
      fontSize: '14px',
      fontWeight: '300'
    },
  }
});

class UserInput extends Component {

  constructor() {
    super();
    this.state = {
      inputActive: false,
      inputHasText: false,
      emojiPickerIsOpen: false,
      emojiFilter: '',
      anchorEl: null,
      open: false,
      productId: '',
      ePrice: '',
      quantity: 0,
      mUnit: ''
    };

    this.handleClick.bind(this)
    this.handleClose.bind(this)
    this.submitquoteFromSeller.bind(this)

  }

  handleClick(event) {
    this.setState({
      anchorEl: event.currentTarget
    })
  };

  handleClose() {
    this.setState({
      anchorEl: null
    })
  }

  handleClickOpen(event) {
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    })
  }

  handleDClose() {
    this.setState({
      open: false
    })
  };

  submitquoteFromSeller() {

    //  let requestBody = {
    //     "businessKey": "127",
    //     "processInstanceId": "process1",
    //     "userId": "seller1",
    //     "journeyName": "sellerNegotiation",
    //     "variables": {
    //       "product_id": this.state.productId,
    //       "estimatedprice": this.state.ePrice,
    //       "quantity": this.state.quantity,
    //       "m_unit": this.state.mUnit,
    //       "brandText": "for Cement"
    //     }
    let requestBody = {
      // "businessKey": "mnbvcxz",
      "businessKey": this.props.businessKey,
      "event": {
        "name": "invokeSXPJourney",
        "value": true
      },
      "variables": {
        "product_id": this.state.productId,
        "estimatedprice": this.state.ePrice.toString(),
        "quantity": this.state.quantity.toString(),
        "m_unit": this.state.mUnit,
        "brandText": "for Cement",
        "userId": "seller1",
        "buyer_id": "buyer1",
        "seller_id": "seller1",
        "journeyName": "sellerNegotiation",
      }
    }

    fetch(`${appData.customApiServerUrl}/case/event`, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('react-token'),
      },
      "body": JSON.stringify(requestBody)
    })
      .then(presponse => presponse.json())
      .then(response => {
        if(response) {
          this.setState({
            open : false
          })
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.emojiPickerButton = document.querySelector('#sc-emoji-picker-button');
  }

  handleKeyDown(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      return this._submitText(event);
    }
  }

  handleKeyUp(event) {
    const inputHasText = event.target.innerHTML.length !== 0 &&
      event.target.innerText !== '\n';
    this.setState({ inputHasText });
  }

  _showFilePicker() {
    this._fileUploadButton.click();
  }

  toggleEmojiPicker = (e) => {
    e.preventDefault();
    if (!this.state.emojiPickerIsOpen) {
      this.setState({ emojiPickerIsOpen: true });
    }
  }

  closeEmojiPicker = (e) => {
    if (this.emojiPickerButton.contains(e.target)) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.setState({ emojiPickerIsOpen: false });
  }

  _submitText(event) {
    event.preventDefault();
    const text = this.userInput.textContent;
    if (text && text.length > 0) {
      this.props.onSubmit({
        author: 'me',
        type: 'text',
        data: { text }
      });
      this.userInput.innerHTML = '';
    }
  }

  _onFilesSelected(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.props.onFilesSelected(event.target.files);
    }
  }

  _handleEmojiPicked = (emoji) => {
    this.setState({ emojiPickerIsOpen: false });
    if (this.state.inputHasText) {
      this.userInput.innerHTML += emoji;
    } else {
      this.props.onSubmit({
        author: 'me',
        type: 'emoji',
        data: { emoji }
      });
    }
  }

  handleEmojiFilterChange = (event) => {
    const emojiFilter = event.target.value;
    this.setState({ emojiFilter });
  }

  _renderEmojiPopup = () => (
    <PopupWindow
      isOpen={this.state.emojiPickerIsOpen}
      onClickedOutside={this.closeEmojiPicker}
      onInputChange={this.handleEmojiFilterChange}
    >
      <EmojiPicker
        onEmojiPicked={this._handleEmojiPicked}
        filter={this.state.emojiFilter}
      />
    </PopupWindow>
  )

  _renderSendOrFileIcon() {
    if (this.state.inputHasText) {
      return (
        <div className="sc-user-input--button">
          <SendIcon onClick={this._submitText.bind(this)} />
        </div>
      );
    }
    return (
      <div className="sc-user-input--button">
        <FileIcon onClick={this._showFilePicker.bind(this)} />
        <input
          type="file"
          name="files[]"
          multiple
          ref={(e) => { this._fileUploadButton = e; }}
          onChange={this._onFilesSelected.bind(this)}
        />
      </div>
    );
  }

  render() {
    const { emojiPickerIsOpen, inputActive } = this.state;
    return (
      <>
        <form className={`sc-user-input ${(inputActive ? 'active' : '')}`}>
          <div
            role="button"
            tabIndex="0"
            onFocus={() => { this.setState({ inputActive: true }); }}
            onBlur={() => { this.setState({ inputActive: false }); }}
            ref={(e) => { this.userInput = e; }}
            onKeyDown={this.handleKeyDown.bind(this)}
            onKeyUp={this.handleKeyUp.bind(this)}
            contentEditable="true"
            placeholder="Write a reply..."
            className="sc-user-input--text"
          >
          </div>
          <div className="sc-user-input--buttons">
            <Button className="sc-user-input--button" aria-haspopup="true" onClick={(event) => this.handleClick(event)}>
              <MailIcon />
            </Button>

            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={() => this.handleClose()}
              className={this.props.classes.menu}
            // style={{backgroundColor: theme.palette.primary.main}}
            >
              <MenuItem onClick={(event) => this.handleClickOpen(event)}
              //  onMouseEnter={(e) => e.target.style.backgroundColor = theme.palette.primary.main}
              // onMouseLeave={(e) => e.target.style.color = theme.palette.secondary.main}
              >
                <div>
                  <span><DescIcon /></span>
                  <span>Quote from Seller</span>
                </div>
              </MenuItem>
              <MenuItem onClick={() => this.handleClose()}>
                <div>
                  <span><PersonIcon /></span>
                  <span>RFQ from Buyer</span>
                </div>
              </MenuItem>
              <MenuItem onClick={() => this.handleClose()}>
                <div>
                  <span><PersonIcon /></span>
                  <span>RFQ to Seller</span>
                </div>
              </MenuItem>
              <MenuItem onClick={() => this.handleClose()}>
                <div>
                  <spa><Forward /></spa>
                  <span>Sending a Document</span>
                </div>
              </MenuItem>
              <MenuItem onClick={() => this.handleClose()}>
                <div>
                  <span><BagIcon /></span>
                  <span>Request / Order Confirmation</span>
                </div>
              </MenuItem>
              <MenuItem onClick={() => this.handleClose()}>
                <div>
                  <span>
                    <MailIcon />
                  </span>
                  <span>General Message</span>
                </div>
              </MenuItem>
            </Menu>
            {/* <div className="sc-user-input--button">
            {this.props.showEmoji && <EmojiIcon
              onClick={this.toggleEmojiPicker}
              isActive={emojiPickerIsOpen}
              tooltip={this._renderEmojiPopup()}
            />}
          </div> */}
            <div className="sc-user-input--button">
              <SendIcon onClick={this._submitText.bind(this)} />
            </div>
            {/* {this._renderSendOrFileIcon()} */}
          </div>
        </form>
        <Dialog maxWidth="xs" open={this.state.open} onClose={() => this.handleDClose()} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Quote from Seller</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Product ID"
              type="text"
              value={this.state.productId}
              onChange={(event) => this.setState({ productId: event.target.value })}
              fullWidth
            />

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Estimated Price"
              type="number"
              value={this.state.ePrice}
              onChange={(event) => this.setState({ ePrice: event.target.value })}
              fullWidth
            />

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Quantity"
              type="text"
              value={this.state.quantity}
              onChange={(event) => this.setState({ quantity: event.target.value })}
              fullWidth
            />

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="M Unit"
              type="text"
              fullWidth
              value={this.state.mUnit}
              onChange={(event) => this.setState({ mUnit: event.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.submitquoteFromSeller()} color="primary">
              Submit
          </Button>
            <Button onClick={() => this.handleDClose()} color="primary">
              cancel
          </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

UserInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onFilesSelected: PropTypes.func.isRequired,
  showEmoji: PropTypes.bool
};

export default withStyles(styles)(UserInput);
