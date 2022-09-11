import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import theme from 'src/theme';
import routes from 'src/routes';
import { useNavigate } from 'react-router-dom';
import config from './views/auth/config.js';
import { KeycloakProvider } from '@react-keycloak/web';
// import keycloak from './keycloak';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { getConfig } from './services/common.js';
import { createBrowserHistory } from 'history';
import Navigator from './Navigator.js';
import ContextProvider from './ContextProvider.js';
import AppConfig from './appConfig.js';
import { useKeycloak } from '@react-keycloak/web';

const defaultHistory = createBrowserHistory();

const App = (props) => {
  const envConfig = props.config;
  console.log("<App /> config", envConfig)
  const history = props.history ? props.history : defaultHistory;

  // const routing = useRoutes(routes);
  // const navigate = useNavigate();
  const [configuration, setConfiguration] = useState(null);
  const [token, setToken] = useState(false);
  const { keycloak } = useKeycloak();

  useEffect(() => {
    if (!configuration) {
      getConfigDetails()
    }
  })

  function getConfigDetails() {
    // getConfig().then(response => {
    //   if (response.success) {
    //     const configData = JSON.parse(response.data);
    //     sessionStorage.setItem('config', JSON.stringify(configData));
    //     setConfiguration(JSON.stringify(configData));
    //   }
    // })

    const configData = config;
    sessionStorage.setItem('config', JSON.stringify(configData));
    setConfiguration(JSON.stringify(configData));

  }

  function handleEvent(event) {
    if (event == 'onAuthSuccess') {
      console.log(keycloak);
      setTokens();
      getUser();
    }

    if (event == 'onTokenExpired') {
      refreshAccessToken();
    }

    if (event == 'onAuthLogout') {
      localStorage.clear()
    }
  }

  function getUser() {
    if (keycloak.idToken) {
      localStorage.setItem('currentUser', keycloak.idTokenParsed.preferred_username)

      console.log(keycloak.idTokenParsed.name);
      console.log(keycloak.idTokenParsed.given_name);
      console.log(keycloak.idTokenParsed.family_name);
    } else {
      keycloak.loadUserProfile(function () {
        console.log('Account Service');
        console.log(keycloak.profile.username);
        console.log(keycloak.profile.email);
        console.log(keycloak.profile.firstName + ' ' + keycloak.profile.lastName);
        console.log(keycloak.profile.firstName);
        console.log(keycloak.profile.lastName);
      }, function () {
        console.log('Failed to retrieve user details. Please enable claims or account role');
      });
    }
  }

  function setTokens() {
    sessionStorage.setItem("react-token", keycloak.token);
    localStorage.setItem("react-refresh-token", keycloak.refreshToken);
    localStorage.setItem('currentUser', keycloak.idTokenParsed?.email);
    localStorage.setItem('userName', keycloak.idTokenParsed?.name)
    setToken(true);
  }

  function refreshAccessToken() {
    keycloak.updateToken(60).success((refreshed) => {
      if (refreshed) {
        console.debug('Token refreshed' + refreshed);
        setTokens()
      } else {
        console.warn('Token not refreshed, valid for '
          + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
      }
    }).error(() => {
      console.error('Failed to refresh token');
      localStorage.clear();
      keycloak.logout();
    });


  }

  return (
    <ContextProvider config={envConfig}>
      <GlobalStyles />
      {/* <KeycloakProvider keycloak={keycloak} initConfig={{ onLoad: 'login-required' }} onEvent={(event) => handleEvent(event)}> */}
      <Provider store={store}>
        <BrowserRouter>
          <AppConfig.Provider value={envConfig}>
            <Navigator history={history} config={envConfig} />
          </AppConfig.Provider>
        </BrowserRouter>
      </Provider>
      {/* </KeycloakProvider> */}
    </ContextProvider>
  );
};

export default App;
