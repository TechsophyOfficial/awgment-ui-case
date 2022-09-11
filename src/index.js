import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css'
import KeycloakWrapper from './KeycloakWrapper';


window.renderCaseInboxMFE = (containerId, history) => {
  fetch('../case-inbox/config.json')
    .then(async (r) => (r.json()))
    .then((config) => {
      console.log("MFE", config)
      ReactDOM.render(<App config={config} history={history} />, document.getElementById(containerId))
    });
  serviceWorker.unregister();
};

window.unmountCaseInboxMFE = (containerId) => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};

if (!document.getElementById('CaseInboxMFE-container')) {
  fetch('../case-inbox/config.json')
    .then(async (r) => (r.json()))
    .then((config) => {
      console.log("NOT MFE", config)
      ReactDOM.render(<KeycloakWrapper config={config} />, document.getElementById('root'));
    })
  serviceWorker.unregister();
}