import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css'
import KeycloakWrapper from './KeycloakWrapper';


window.renderCaseInboxMFE = (containerId, history) => {
  ReactDOM.render(<App history={history} />, document.getElementById(containerId));
  serviceWorker.unregister();
};

window.unmountCaseInboxMFE = (containerId) => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};

if (!document.getElementById('CaseInboxMFE-container')) {
  ReactDOM.render(<KeycloakWrapper />, document.getElementById('root'));
  serviceWorker.unregister();
}