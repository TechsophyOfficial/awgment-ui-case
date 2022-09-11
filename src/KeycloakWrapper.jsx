import React from 'react';
import Keycloak from 'keycloak-js';
import { createBrowserHistory } from 'history';

// !--------- KEYCLOAK IMPORT -------------
import { ReactKeycloakProvider } from '@react-keycloak/web';
import AppWrapper from './AppWrapper';

const defaultHistory = createBrowserHistory();

const KeycloakWrapper = (props) => {
    // !--------- REMOVE KEYCLOAK CODE -------------
    const config = props.config;
    console.log("<Keycloak wraper /> /> config", config)
    const history = props.history ? props.history : defaultHistory;

    const keycloak = new Keycloak({
        realm: `${config.keyCloakRealm}`,
        url: `${config.keyCloakUrl}auth/`,
        clientId: `${config.keyCloakClientId}`,
    });

    const setTokens = () => {
        const { token, refreshToken, idTokenParsed } = keycloak;
        if (token && refreshToken && idTokenParsed) {
            sessionStorage.setItem('react-token', token);
            localStorage.setItem('token', token);
            localStorage.setItem('currentUser', idTokenParsed.preferred_username); // For case inbox filter api
        }
    };

    const refreshAccessToken = () => {
        keycloak
            .updateToken(50)
            .success((refreshed) => {
                if (refreshed) {
                    setTokens();
                }
            })
            .error(() => {
                sessionStorage.clear();
                keycloak.logout();
            });
    };

    const handleEvent = (event) => {
        if (event === 'onAuthSuccess') {
            setTokens();
        }

        if (event === 'onTokenExpired') {
            refreshAccessToken();
        }

        if (event === 'onAuthLogout') {
            sessionStorage.clear();
        }
    };
    // !----------------------------------------------

    return (
        <ReactKeycloakProvider
            initOptions={{
                onLoad: 'login-required',
                checkLoginIframe: false,
            }}
            authClient={keycloak}
            onEvent={handleEvent}>
            <AppWrapper config={config} history={history} />
        </ReactKeycloakProvider>
    );
};

export default KeycloakWrapper;
