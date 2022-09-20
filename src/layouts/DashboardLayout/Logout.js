import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
    AppBar,
    Badge,
    Box,
    Hidden,
    IconButton,
    Toolbar,
    makeStyles
} from '@material-ui/core';
import Person from '@material-ui/icons/Person';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useKeycloak } from '@react-keycloak/web';


const useStyles = makeStyles(() => ({
    root: {},
    avatar: {
        width: 60,
        height: 60
    },
    formControl: {
        // margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        // marginTop: theme.spacing(2),
    },
}));

const Logout = ({
    className,
    onMobileNavOpen,
    ...rest
}) => {
    const classes = useStyles();
    const [notifications] = useState([]);
    const { keycloak } = useKeycloak();

    function logout() {
        keycloak.logout();
        localStorage.clear();
    }

    return (
        <span  onClick={() => logout()}>
            Logout
        </span>
    );
};

Logout.propTypes = {
    className: PropTypes.string,
    onMobileNavOpen: PropTypes.func
};

export default Logout;
