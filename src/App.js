import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from 'src/components/GlobalStyles';
import config from './views/auth/config.js';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { createBrowserHistory } from 'history';
import Navigator from './Navigator.js';
import ContextProvider from './ContextProvider.js';
import AppConfig from './appConfig.js';

const defaultHistory = createBrowserHistory();

const App = (props) => {
  const envConfig = props.config;
  const history = props.history ? props.history : defaultHistory;
  const [configuration, setConfiguration] = useState(null);

  useEffect(() => {
    if (!configuration) {
      getConfigDetails()
    }
  })

  function getConfigDetails() {

    const configData = config;
    sessionStorage.setItem('config', JSON.stringify(configData));
    setConfiguration(JSON.stringify(configData));

  }


  return (
    <ContextProvider config={envConfig}>
      <GlobalStyles />
      <Provider store={store}>
        <BrowserRouter>
          <AppConfig.Provider value={envConfig}>
            <Navigator history={history} config={envConfig} />
          </AppConfig.Provider>
        </BrowserRouter>
      </Provider>
    </ContextProvider>
  );
};

export default App;
