import React from 'react';
// !--------- KEYCLOAK IMPORT -------------
import { useKeycloak } from '@react-keycloak/web';
import App from './App';

const AppWrapper = ({ config, history }): React.ReactElement => {
    const { keycloak } = useKeycloak();
    return <>{keycloak.authenticated && <App config={config} history={history} />}</>;
};

export default AppWrapper;
