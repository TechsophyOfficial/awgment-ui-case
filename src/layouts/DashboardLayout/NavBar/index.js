import React, { useContext, useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  IconButton,
  makeStyles,
  InputLabel
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  User,
  List as ListIcon
} from 'react-feather';
import NavItem from './NavItem';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FormControl, Input } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateFilterDailog from '../CreateFilterDailog';
import { getFilterList } from 'src/services/camundaService';
import AppConfig from 'src/appConfig';

const itemss = [
  {
    href: '/app/my-tasks',
    icon: User,
    title: 'My Tasks'
  },
  {
    href: '/app/group-tasks',
    icon: UsersIcon,
    title: 'Group Tasks'
  },
  {
    href: '/app/completed-tasks',
    icon: ListIcon,
    title: 'Completed Tasks'
  },
  // {
  //   href: '/app/account',
  //   icon: UserIcon,
  //   title: 'Account'
  // },
  // {
  //   href: '/login',
  //   icon: LockIcon,
  //   title: 'Login'
  // },
  // {
  //   href: '/register',
  //   icon: UserPlusIcon,
  //   title: 'Register'
  // },
  // {
  //   href: '/404',
  //   icon: AlertCircleIcon,
  //   title: 'Error'
  // }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [items, setItem] = useState(itemss);
  const appData = useContext(AppConfig)

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    if(items.length === itemss.length || items.length < itemss.length){
      getFilters();
    }   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  function getFilters() {
      const BASE_URL = `${appData.appServerURL}`;
      getFilterList(BASE_URL).then(response => {
      if(response.success) {
        let itemsArr = [...items]
        response.data.map(filter => {
          const obj = {
            href: '/app/filter/' + filter.id,
            icon: AlertCircleIcon,
            title: filter.name
          }
          // itemsArr.push(obj);
        });
        setItem(itemsArr);
      }
    })
    // fetch(`${process.env.REACT_APP_SERVER_URL}/filter`, {
    //   "method": "GET"
    // })
    //   .then(presponse => presponse.json())
    //   .then(response => {
    //     let itemsArr = [...items]
    //     response.map(filter => {
    //       const obj = {
    //         href: '/app/filter/' + filter.id,
    //         icon: AlertCircleIcon,
    //         title: filter.name
    //       }
    //       // itemsArr.push(obj);
    //     });
    //     setItem(itemsArr);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Hidden mdDown>
          <IconButton color="primary" onClick={handleClickOpen}>
            <AddCircleIcon />
            <span color="primary">
              Create a filter
            </span>
          </IconButton>
        </Hidden>
        {/* <Button>
          <Icon
            className='plus-circle'
            size="20"
          />
        <span>
          Create a filter
        </span>
      </Button> */}
        {/* <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/app/account"
        /> */}
        {/* <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography> */}
        {/* <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.jobTitle}
        </Typography> */}
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
      <div>
        {/* {createFilterForm} */}
        <CreateFilterDailog isOpen={open} openStatus={handleClose}/>
      </div>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default NavBar;
