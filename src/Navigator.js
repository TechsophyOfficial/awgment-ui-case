import React, { useContext } from 'react';
import { Router, Route, Redirect, BrowserRouter, useRoutes } from 'react-router-dom';
import { createBrowserHistory } from "history";
import MyTasksListView from './views/customer/MyTasksListView';
import Basename from './Basename';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';
import AccountView from './views/account/AccountView';
import GroupTasksView from './views/group/GroupTasksView';
import CompletedTasksView from './views/completed/CompletedTasksView'
import LoginView from './views/auth/LoginView';
import NotFoundView from './views/errors/NotFoundView';
import { GetId } from "./views/filter-tasks/FilterListView/GetId.js";
import AllTasksView from './views/allTaks/AllTasksListView';
import { ALL_TASKS } from './constants/routes';




const defaultHistory = createBrowserHistory();
// const {
//     REACT_APP_HOST: commonHost,
//     REACT_APP_ACCOUNTS_HOST: accountsHost,
//     REACT_APP_CASE_INBOX_HOST : caseInboxHost
//   } = process.env;



const Navigator = ({ history, config }) => {
    const routes = [
        {
            path: '/app',
            element: <DashboardLayout />,
            children: [
                { path: 'account', element: <AccountView /> },
                { path: 'my-tasks', element: <MyTasksListView /> },
                { path: ALL_TASKS, element: <AllTasksView /> },
                { path: 'group-tasks', element: <GroupTasksView /> },
                { path: 'completed-tasks', element: <CompletedTasksView /> },
                { path: 'filter/:filterId', element: <GetId /> },
                { path: '*', element: <Navigate to="/404" /> }
            ]
        },
        {
            path: '/',
            element: <MainLayout />,
            children: [
                { path: 'login', element: <LoginView /> },
                { path: '404', element: <NotFoundView /> },
                { path: '/', element: <Navigate to={Basename(window.location.href, config) + '/app/my-tasks'} /> },
                { path: '*', element: <Navigate to="/404" /> }
            ]
        }
    ];

    const routing = useRoutes(routes, Basename(history.location.pathname, config));

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
