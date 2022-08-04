import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Avatar,
    Box,
    Button,
    Hidden,
    Typography,
    IconButton,
    makeStyles,
    InputLabel
} from '@material-ui/core';
import {
    AlertCircle as AlertCircleIcon,
    BarChart as BarChartIcon,
    Lock as LockIcon,
    ShoppingBag as ShoppingBagIcon,
    User as UserIcon,
    UserPlus as UserPlusIcon,
    Users as UsersIcon,
    User,
    List as ListIcon
} from 'react-feather';
import NavItem from './NavBar/NavItem';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CreateFilterDailog from './CreateFilterDailog';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FilterListIcon from '@material-ui/icons/FilterList';
// for left drawer
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import SettingsIcon from '@material-ui/icons/Settings';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import SecurityIcon from '@material-ui/icons/Security';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { useSelector, useDispatch } from 'react-redux';
import { refreshFilters } from 'src/redux/actions';
import { getFilterList } from 'src/services/camundaService';
import Basename from 'src/Basename';
import { PlaylistAdd } from '@material-ui/icons';



const itemss = [
    {
        href: '/app/my-tasks',
        icon: PersonIcon,
        title: 'My Tasks'
    },
    {
        href: '/app/group-tasks',
        icon: PeopleIcon,
        title: 'Group Tasks'
    },
    {
        href: '/app/all-tasks',
        icon: PlaylistAdd,
        title: 'All Tasks'
    },
    {
        href: '/app/completed-tasks',
        icon: VerifiedUserIcon,
        title: 'Completed Tasks'
    }
];

const static_items = [
    // {
    //     href: '/app/my-tasks',
    //     icon: AddAlertIcon,
    //     title: 'Notification'
    // },
    // {
    //     href: '/app/group-tasks',
    //     icon: SecurityIcon,
    //     title: 'Users and Roles'
    // },
    // {
    //     href: '/app/completed-tasks',
    //     icon: SettingsIcon,
    //     title: 'Setting'
    // },
    {
        click: '/app/completed-tasks',
        icon: AddBoxIcon,
        title: 'Add Filter'
    }
];

const useStyles = makeStyles((theme) => ({
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
    },
    //   button: {
    //     display: 'block',
    //     marginTop: theme.spacing(2),
    //   },
    formControl: {
        marginTop: theme.spacing(1),
        minWidth: 120,
        flex: 1,
    },
    select: {
        flex: 1,
    },
    drawer: {
        flexShrink: 0
    },
    drawerPaper: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.background.default,
        maxWidth: '44px',
        minWidth: '44px'
    },
    menuIcon: {
        minWidth: 10,
        color: theme.palette.background.default
    }
}));


const NavDropdown = () => {
    const classes = useStyles();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(null);
    const [items, setItem] = useState(itemss);
    const [selectedFilter, setSelectedFilter] = React.useState('');
    const filter = useSelector((state) => ({
        refresh: state.filter?.refresh
    }));
    const dispatch = useDispatch();

    useEffect(() => {
        if (filter.refresh) {
            getFilters();
        }
    }, [filter.refresh])

    useEffect(() => {
        // if (openMobile && onMobileClose) {
        //   onMobileClose();
        // }
        if (items.length === itemss.length || items.length < itemss.length) {
            getFilters();
        }
        if (edit) {
            if (edit) {
                setEdit(null);
            }
            getFilters();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    const handleChange = (event) => {
        setSelectedFilter(event.target.value);
    };

    function getFilters() {
        getFilterList().then(response => {
            if (response.success) {
                let itemsArr = [...itemss]
                response.data.map(element => {
                    const obj = {
                        id: element.id,
                        href: '/app/filter/' + element.id,
                        icon: FilterListIcon,
                        title: element.name,
                        edit: true
                    }
                    itemsArr.push(obj);

                    // if (!handleCheck(obj)) {
                    //     itemsArr.push(obj);
                    // } else {
                    //     if (edit) {
                    //         let idx = handleEdit(obj, itemsArr);
                    //         if (idx) {
                    //             itemsArr[idx].title = obj.title;
                    //         }
                    //     }
                    // }
                });
                setItem(itemsArr);
                dispatch(refreshFilters(false))
            }
        })
        // fetch(`${process.env.REACT_APP_SERVER_URL}/filter?owner=` + localStorage.getItem('currentUser'), {
        //     "method": "GET",
        //     "headers": {
        //         "Authorization": "Bearer " + localStorage.getItem('react-token')
        //     }
        // })
        //     .then(presponse => presponse.json())
        //     .then(response => {
        //         let itemsArr = [...itemss]
        //         response.map(element => {
        //             const obj = {
        //                 id: element.id,
        //                 href: '/app/filter/' + element.id,
        //                 icon: FilterListIcon,
        //                 title: element.name,
        //                 edit: true
        //             }
        //             itemsArr.push(obj);

        //             // if (!handleCheck(obj)) {
        //             //     itemsArr.push(obj);
        //             // } else {
        //             //     if (edit) {
        //             //         let idx = handleEdit(obj, itemsArr);
        //             //         if (idx) {
        //             //             itemsArr[idx].title = obj.title;
        //             //         }
        //             //     }
        //             // }
        //         });
        //         setItem(itemsArr);
        //         dispatch(refreshFilters(false))
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
    }

    const handleCheck = (val) => {
        return items.some(item => val.id === item.id);
    }
    const handleEdit = (obj, itemarr) => {
        return itemarr.findIndex(item => item.id == obj.id)
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEditClick = (id) => {
        setEdit(id);
        setOpen(true);
    }


    const onFilterSaved = (value) => {
        let itemsArr = [...items];
        if (value && value == 'close' && edit) {
            setEdit(null)
        }
        else if (edit && value == 'delete') {
            itemsArr = itemsArr.filter(x => x.id != edit);
            setEdit(null);
            setItem(itemsArr);
        } else if (edit && value == 'update') {
            // setEdit(null);
            // setItem(itemsArr);
            getFilters();
        } else {
            getFilters();
        }

    }

    const content = (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
        >
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {items.map((item, index) => (

                    <NavItem
                        id={item.id}
                        href={Basename(location.pathname) + item.href}
                        key={item.title}
                        title={item.title}
                        icon={item.icon}
                        edit={item.edit ? item.edit : false}
                        onEditClick={handleEditClick}
                    />

                ))}
            </List>
            <List>
                {static_items.map((item, index) => (

                    <NavItem
                        id={item.id}
                        href={Basename(location.pathname) + item.href}
                        click={item.click}
                        key={item.title}
                        title={item.title}
                        icon={item.icon}
                        edit={item.edit ? item.edit : false}
                        onEditClick={handleEditClick}
                        onFilterClicked={handleClickOpen}
                    />

                ))}
            </List>
        </Drawer>
    );

    return (
        <div>
            {content}
            <div>
                <CreateFilterDailog isOpen={open} isEdit={edit} openStatus={handleClose} onFilterSaved={onFilterSaved} />
            </div>
        </div>
    );
};


export default NavDropdown;
