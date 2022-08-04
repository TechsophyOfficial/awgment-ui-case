import React, { useContext } from 'react';
import { Router, Route, Redirect, BrowserRouter , useRoutes} from 'react-router-dom';
import { createBrowserHistory } from "history";
import routes from 'src/routes';
import MyTasksListView from './views/customer/MyTasksListView';
import Basename from './Basename';




const defaultHistory = createBrowserHistory();
// const {
//     REACT_APP_HOST: commonHost,
//     REACT_APP_ACCOUNTS_HOST: accountsHost,
//     REACT_APP_CASE_INBOX_HOST : caseInboxHost
//   } = process.env;



const Navigator = ({ history}) => {
      const routing = useRoutes(routes,Basename(history.location.pathname));

    // if (initialized && keycloak.authenticated && token ) {
        
        return (
            <>
            {routing}
            </>
        );
    // }
    return <div>Loading ... </div>;
};

export default Navigator;
