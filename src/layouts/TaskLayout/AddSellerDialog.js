import React, { useRef, useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
    makeStyles,
    Typography,
    DialogActions,
    Button,
    Icon,
    Menu,
    TextField,
    FormControl
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import './style.css';
import sellerListData from './data/seller';
import selectedSellersData from './data/selectedSeller';
import VariablesDialog from 'src/components/sxp-chat2/src/components/Widget/components/Conversation/components/Sender/variablesDialog';
import { SELLER_WIDGET_ID } from 'src/variables/chatWidget';

const useStyles2 = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        '& .MuiTypography-body2': {
            fontSize: 12,
            fontWeight: 400,
            color: theme.palette.secondary.main,
            paddingLeft: 20
        }
    },
    dialogPaper: {
        minHeight: '80vh',
        maxHeight: '80vh',
        minWidth: '50%',
        '& .MuiDialogActions-root': {
            padding: '0',
        },
        '& .MuiListItem-gutters':{
            paddingLeft : '10px'
        },  
        '& .MuiButton-text':{
            padding : '16px 8px'
        },
        '& .MuiDialogContent-root': {
            padding : '8px 0px'
        },
        '& .sc-user-input': {
            backgroundColor: '#eee',
            minHeight: 74,
            display: 'flex'
        },
        '& .seller-message--text': {
            minHeight: 52,
            backgroundColor: '#fff',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
            borderRadius: 5,
            marginLeft: 25,
            width: '75%'
        },
        '& .sc-user-input--buttons': {
            alignItems: 'center',
            display: 'flex'
        },
        '& .MuiDialogActions-root .activiti-option .MuiIcon-root': {
            width: 22
        },
        '& .MuiDialogActions-root .activiti-option .MuiTypography-caption': {
            fontSize: 13,
            fontWeight: 700,
            textTransform: 'capitalize'
        }
    },
    dialogTitle: {
        color: theme.palette.text.header
    },
    dialogTitleSection: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        // float: 'left'
        '&>div': {
            flex: 1
        },
        '&>div:nth-child(2)': {
            flex: 2
        },
        '& h5': {
            fontWeight: 500,
            fontSize: 18
        }
    },
    sellerRow: {
        borderTop: '1px solid #d6d6d6'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    filteInputs: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        '& .MuiButton-root': {
            fontSize: 12,
            fontWeight: 400,
            textTransform: 'capitalize',
            minWidth: 90,
            maxHeight: 27
        }
    },
    filterSelect: {
        borderRadius: '7px',
        '&<div': {
            padding: '7px 4px'
        },
        '&:hover' : {
            filter: 'drop-shadow(0px 0px 5px #2C98F0)',
            background : '#fff'
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline' : {
            borderColor : '#c1c1c1'
        }

    },
    filterBox : {
        width: '80%',
        marginLeft : '10%'
    },
    filterRow: {
        display: 'flex',
        width: '100%'
    },
    menu: {
        "&>*": {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.text.header,
            fontSize: '14px',
            fontWeight: '300'
        },
    },
    searchField: {
        backgroundColor: '#fff',
        borderRadius: 7,
        marginLeft: 10,
        "& .MuiFilledInput-underline:before": {
            border: 'none'
        },
        '& .MuiFilledInput-root': {
            backgroundColor: '#fff'
        }
    },
    sellerCheckbox: {
        color: '#fff',
        "&>svg": {
            color: '#fff',
            backgroundColor: theme.palette.primary.main
        },
        "& path": {
            color: '#fff',
            stroke: theme.palette.primary.main
        }
    }
}));

const AddSellerDialog = ({ isOpen, dialogData, openStatus, onSellerListChange, handleTextInputToSend, onMailOptionSubmit }) => {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles2();
    const [checked, setChecked] = React.useState([]);
    const [cat, setCat] = React.useState('');
    const [brand, setBrand] = React.useState('');
    const [prod, setProd] = React.useState('');
    const [priceRange, setPriceRange] = React.useState('');
    const [loc, setLoc] = React.useState('');
    const [sellerList, setSellerList] = React.useState([]);
    const [selectedSellers, setSelectedSellers] = React.useState([]);
    const inputRef = useRef(null);
    const [message, setMessage] = React.useState('');
    const [configJson, setConfigJson] = React.useState(null);
    const [templateList, setTemplateList] = React.useState([]);
    const [menu, setMenu] = React.useState(null);
    const [taskId, setTaskId] = React.useState(null);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [variablesDialogData, setVariablesDialogData] = React.useState({ name: '', variablesList: [], journeyName: '' });

    useEffect(() => {
        setOpen(isOpen);
        setTaskId(null);
        if (isOpen) {
            setSelectedSellers(dialogData.selectedSellers)
        }
    }, [isOpen])

    useEffect(() => {
        getSellerList();
        let config = JSON.parse(sessionStorage.getItem('config') || '{}');
        setConfigJson(config);
        setTemplateList(config ?
            (config.journey_templates ? config.journey_templates[SELLER_WIDGET_ID] : [])
            : []);
    }, []);

    useEffect(() => {
        if (sellerList.length > 0 && selectedSellers.length > 0 && checked.length == 0) {
            getCheckedList()
        }
    });

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    // get list of sellers
    function getSellerList() {
        setSellerList(sellerListData);
        setSelectedSellers(dialogData ? dialogData.selectedSellers : []);
    }

    // get list of selected sellers 
    function getCheckedList() {
        let checkedList = [...checked];
        sellerList.forEach(seller => {
            var findItem = selectedSellers.find(x => x.id === seller.id);
            if (findItem) {
                checkedList.push(seller);
            }
        })
        setChecked(checkedList);
    }

    // close the menu 
    const handleClose = () => {
        setOpen(false);
        openStatus(false);
    };

    // add seller to the list 
    const handleAddSeller = () => {
        onSellerListChange(checked);
        openStatus(false);
    };

    function _submitText(event) {
        event.preventDefault();
        if (message && message.length > 0) {
            handleTextInputToSend({
                message: inputRef.current.value,
                senderList: getSellerIds()
            })
            inputRef.current.value = '';
        }
    }

    // get ids of the sellers 
    function getSellerIds() {
        let ids = checked.map(function (item) {
            return item.name;
        });
        return ids;
    }

    const handleMenuClose = () => {
        setMenu(null);
    };

    const handleMenuClick = (event) => {
        setMenu(event.currentTarget);
    };

    function onTextInputChange(e) {
        setMessage(e.target.value)
    }

    function handleClickOpen(event, value) {
        setMenu(event.currentTarget);
        setVariablesDialogData({ name: value.name, variablesList: value.variables, journeyName: value.journeyName })
        setOpenDialog(true);
    }

    function submitTemplateRequest(event) {
        onMailOptionSubmit(event, checked);
        setOpenDialog(false);
        setMenu(null);
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose}  aria-labelledby="form-dialog-title" classes={{ paper: classes.dialogPaper }}>
                <DialogTitle id="form-dialog-title" color="primary" classes={{ root: classes.dialogTitle }}>
                    <div className={classes.dialogTitleSection}>
                        <div>
                            <Typography variant="h5">List of Sellers</Typography>
                        </div>
                        <TextField id="outlined-search" className={classes.searchField + ' search-field'} label="Search by Mob No / Name" type="search" variant="filled" />
                        <div>
                            <CloseIcon onClick={handleClose} style={{ float: 'right' }} />
                        </div>
                    </div>

                </DialogTitle>
                <DialogContent>
                    <div>
                        <div className={classes.filterBox}>
                            <div className={classes.filterRow}>
                                <div className={classes.filteInputs + ' filter-input'}>
                                    <label >Category</label>
                                    <FormControl variant="outlined" className={classes.formControl + ' filter-control'}>
                                        <InputLabel id="demo-simple-select-outlined-label">Categoty</InputLabel>
                                        <Select
                                            labelId="dark-menu"
                                            id="demo-simple-select-outlined"
                                            value={cat}
                                            onChange={(event) => setCat(event.target.value)}
                                            label="Category"
                                            className={classes.filterSelect + ' filter-select menu-dark '}
                                        >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>

                                <div className={classes.filteInputs + ' filter-input'}>
                                    <label >Sort By</label>
                                    <FormControl variant="outlined" className={classes.formControl + ' filter-control'}>
                                        <InputLabel id="demo-simple-select-outlined-label">Brand</InputLabel>
                                        <Select
                                            labelId="dark-menu"
                                            id="demo-simple-select-outlined"
                                            value={brand}
                                            onChange={(event) => setBrand(event.target.value)}
                                            label="Category"
                                            className={classes.filterSelect + ' filter-select'}
                                        >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>

                                <div className={classes.filteInputs + ' filter-input'}>
                                    <label >Product</label>
                                    <FormControl variant="outlined" className={classes.formControl + ' filter-control'}>
                                        <InputLabel id="demo-simple-select-outlined-label">Product</InputLabel>
                                        <Select
                                            labelId="dark-menu"
                                            id="demo-simple-select-outlined"
                                            value={prod}
                                            onChange={(event) => setProd(event.target.value)}
                                            label="Category"
                                            className={classes.filterSelect + ' filter-select'}
                                        >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>

                            <div className={classes.filterRow}>
                                <div className={classes.filteInputs + ' filter-input'}>
                                    <label >Price Range</label>
                                    <FormControl variant="outlined" className={classes.formControl + ' filter-control'}>
                                        <InputLabel id="demo-simple-select-outlined-label">Price Range</InputLabel>
                                        <Select
                                            labelId="dark-menu"
                                            id="demo-simple-select-outlined"
                                            value={priceRange}
                                            onChange={(event) => setPriceRange(event.target.value)}
                                            label="Category"
                                            className={classes.filterSelect + ' filter-select'}
                                        >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>

                                <div className={classes.filteInputs + ' filter-input'}>
                                    <label >Location</label>
                                    <FormControl variant="outlined" className={classes.formControl + ' filter-control'}>
                                        <InputLabel id="demo-simple-select-outlined-label">Location</InputLabel>
                                        <Select
                                            labelId="dark-menu"
                                            id="demo-simple-select-outlined"
                                            value={loc}
                                            onChange={(event) => setLoc(event.target.value)}
                                            label="Category"
                                            className={classes.filterSelect + ' filter-select'}
                                        >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className={classes.filteInputs + ' filter-input'}>
                                    <Button variant="outlined" color="primary">
                                        Filter
                               </Button>
                                </div>

                            </div>
                        </div>

                        <div>
                            <List dense className={classes.root}>
                                {sellerList.map((value, index) => {
                                    const labelId = `checkbox-list-secondary-label-${value.id}`;
                                    return (
                                        <ListItem key={value.id} button className={classes.sellerRow}>
                                            <ListItemText id={labelId} primary={`${value.name}`} />
                                            <Checkbox
                                                edge="end"
                                                checkedIcon={<Icon>done</Icon>}
                                                color="primary"
                                                onChange={handleToggle(value)}
                                                checked={checked.indexOf(value) !== -1}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                                className={classes.sellerCheckbox + ' seller-checkbox'}
                                            />
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <div>
                        <form className={`sc-user-input`}>
                            <input
                                type="text"
                                className="seller-message--text"
                                name="message"
                                ref={inputRef}
                                placeholder={'Default message window / Type your own message'}
                                autoComplete="off"
                                onChange={onTextInputChange}
                            />
                            <div className="sc-user-input--buttons">
                                <Button className="sc-user-input--button" aria-haspopup="true" onClick={handleMenuClick}>
                                    {/* <MailIcon /> */}
                                    <Icon color="primary">email</Icon>
                                    <Icon color="primary">arrow_drop_down</Icon>
                                </Button>

                                <Menu
                                    id="simple-menu"
                                    anchorEl={menu}
                                    keepMounted
                                    open={Boolean(menu)}
                                    onClose={handleMenuClose}
                                    className={classes.menu}
                                >

                                    {templateList && templateList.map((value, index) => {
                                        return (
                                            <MenuItem key={value.name} onClick={(event) => handleClickOpen(event, value)}                                        >
                                                <div className={'sc-mail-popup'}>
                                                    <Icon>{value.icon}</Icon>
                                                    <span>{value.name}</span>
                                                </div>
                                            </MenuItem>
                                        )
                                    })}
                                </Menu>

                                <div className="sc-user-input--button">
                                    <Icon onClick={_submitText}>send</Icon>
                                </div>
                            </div>
                        </form>

                    </div>
                    <Button>
                        <div className="activiti-option"
                            onClick={handleAddSeller}>
                            <Icon color="primary" fontSize="inherit">person_add</Icon>
                            <Typography color="primary" variant="caption" >Add</Typography>
                        </div>
                    </Button>
                    <Button>
                        <div className="activiti-option"
                            onClick={handleClose}>
                            <Icon fontSize="inherit">person_remove</Icon>
                            <Typography variant="caption" >Cancel</Typography>
                        </div>
                    </Button>

                </DialogActions>
            </Dialog>
            <VariablesDialog
                isOpen={openDialog}
                dialogData={variablesDialogData}
                closeDialog={() => setOpenDialog(false)}
                onMailOptionSubmit={(event) => submitTemplateRequest(event)}
            />
        </div>
    );
}

export default AddSellerDialog;
