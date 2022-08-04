import React, { Component } from 'react';

import { Widget, addUserMessage, addResponseMessage, setQuickButtons, toggleMsgLoader, addLinkSnippet } from '../index';

export default class App extends Component {
  componentDidMount() {
    // addResponseMessage('Welcome to this awesome chat!', '123')
    // addResponseMessage('Welcome to this awesome bb chat!', "456");
    // addLinkSnippet({ link: 'https://google.com', title: 'Google' }, '123');
    // addResponseMessage('![](https://raw.githubusercontent.com/Wolox/press-kit/master/logos/logo_banner.png)', '123');
    // addResponseMessage('![vertical](https://d2sofvawe08yqg.cloudfront.net/reintroducing-react/hero2x?1556470143)', '123');
  }

  handleANewUserMessage = (newMessage: any) => {
    toggleMsgLoader('123');
    setTimeout(() => {
      toggleMsgLoader('123');
      if (newMessage === 'fruits') {
        setQuickButtons([{ label: 'Apple', value: 'apple' }, { label: 'Orange', value: 'orange' }, { label: 'Pear', value: 'pear' }, { label: 'Banana', value: 'banana' }], '123');
      } else {
        // addResponseMessage(newMessage, "123");
      }
    }, 2000);
  }

  handleBNewUserMessage = (newMessage: any) => {
    toggleMsgLoader('456');
    setTimeout(() => {
      toggleMsgLoader('456');
      if (newMessage === 'fruits') {
        setQuickButtons([{ label: 'Apple', value: 'apple' }, { label: 'Orange', value: 'orange' }, { label: 'Pear', value: 'pear' }, { label: 'Banana', value: 'banana' }], '456');
      } else {
        // addResponseMessage(newMessage, "456");
      }
    }, 2000);
  }

  handleAQuickButtonClicked = (e: any) => {
    // addResponseMessage('Selected ' + e, '123');
    setQuickButtons([], '123');
  }

  handleSubmit = (msgText: string) => {
    if (msgText.length < 80) {
      // addUserMessage("Uh oh, please write a bit more.", '123');
      return false;
    }
    return true;
  }

  onFileUpload = (e) => {
    alert('File Uploaded')
  }

  onRestart = (e) => {
    alert('restart clicked')
  }

  onEdit = (e) => {
    alert('Edit clicked')
  }

  // MAYDAY
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Widget
          title="Widget 1 "
          senderPlaceHolder="send"
          handleNewUserMessage={this.handleANewUserMessage}
          handleQuickButtonClicked={this.handleAQuickButtonClicked}
          imagePreview
          chatId={'123'}
          onRestart={this.onRestart}
          onEdit={this.onEdit}
          onFileUpload={this.onFileUpload}
          handleSubmit={this.handleSubmit}
        />
        {/* <button onClick={e => addResponseMessage('w1', "123")} style={{ position: 'absolute', right: 40, bottom: 150 }}>Add to W1</button> */}
        {/* <button onClick={e => addResponseMessage('w2', "456")} style={{ position: 'absolute', right: 40, bottom: 130 }}>Add to W2</button> */}

        <Widget
          title="Widget 2"
          senderPlaceHolder="send"
          handleNewUserMessage={this.handleBNewUserMessage}
          handleQuickButtonClicked={this.handleAQuickButtonClicked}
          imagePreview
          chatId={'456'}
          onRestart={this.onRestart}
          onEdit={this.onEdit}
          onFileUpload={this.onFileUpload}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}
