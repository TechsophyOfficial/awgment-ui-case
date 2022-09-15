import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css'
import KeycloakWrapper from './KeycloakWrapper';

declare const window: any;

window.renderCaseInboxMFE = (containerId: string, history) => {
  fetch('../case-inbox/config.json')
    .then(async (r) => (r.json()))
    .then((config) => {
      ReactDOM.render(<App config={config} history={history} />, document.getElementById(containerId))
    });
  serviceWorker.unregister();
};

window.unmountCaseInboxMFE = (containerId) => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId) as HTMLElement);
};

if (!document.getElementById('CaseInboxMFE-container')) {
  fetch('../case-inbox/config.json')
    .then(async (r) => (r.json()))
    .then((config) => {
      ReactDOM.render(<KeycloakWrapper config={config} />, document.getElementById('root'));
    })
  serviceWorker.unregister();
}