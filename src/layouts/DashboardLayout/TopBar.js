import React, { useState, useEffect } from 'react';
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
import Logo from '../../components/Logo';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Logout from './Logout';
import theme from '../../theme';
import '../TaskLayout/style.css'


const useStyles = makeStyles(() => ({
  root: {
    backgroundColor : theme.palette.secondary.main,
    height : 54,
    zIndex : 1201,
    '& .MuiToolbar-root' : {
      marginLeft : '2%'
    },
    '& .MuiToolbar-root h3' : { 
     fontSize : 24,
     fontWeight : 500
    }
  },
  avatar: {
    width: 60,
    height: 60
  },
  profile_section: {
    display: 'flex',
    backgroundColor: theme.palette.background.default,
    borderRadius : '10px',
    fontSize : '10px',
    paddingRight : '7px',
    alignItems : 'center',
    minWidth : 100,
    display : 'flex',
    textAlign : 'center',

    '& span' : {
      flex : 2
    }
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    // marginTop: theme.spacing(2),
  },
}));

const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();
  const [notifications] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar variant="dense">
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box flexGrow={1} />
        <Button aria-controls="fade-menu" aria-haspopup="true" >
          {/* <IconButton color="inherit"> */}
          <NotificationsIcon style={{ color: '#fff' }} />
          {/* </IconButton>  */}
        </Button>
        <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
          {/* <IconButton color="inherit"> */}

          {/* </IconButton>  */}
          <div className={classes.profile_section}>
            <Person />
            <span>{localStorage.getItem('userName') ? localStorage.getItem('userName') : 'User'}</span>
          </div>
        </Button>
        <Menu
          id="fade-menu"
          labelId="dark-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
          className={'menu-dark'}
        >
          <MenuItem onClick={handleClose}>
            {/* <RouterLink to="/login"><span>Logout</span></RouterLink> */}
            <Logout></Logout>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <RouterLink to="/app/account"><span>My Profile</span></RouterLink>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
