import React, { useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
    makeStyles,
    Typography,
    DialogActions,
    Button,
    Icon,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './style.css';
import sellerListData from './data/seller';
import broadCaseSellerListData from './data/broadcastSeller';
import Checkbox from '@material-ui/core/Checkbox';


const useStyles2 = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        '& .MuiTypography-body2': {
            fontSize: 12,
            fontWeight: 400,
            color: theme.palette.secondary.main
        }
    },
    dialogPaper: {
        minHeight: '80vh',
        maxHeight: '80vh',
        minWidth: '50%',
        '& .MuiDialogContent-root': {
            padding: 0
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
    dialogTitleSection: {
        display: 'flex',
        alignItems: 'center',
        width: '80%',
        float: 'left',
        '& h4': {
            fontWeight: 400,
            fontSize: 18
        }
    },
    dialogTitle: {
        color: theme.palette.text.header
    },
    sellerRow: {
        borderBottom: '1px solid #f5f2f2'
    },
    sellerCheckbox: {
        "&>svg": {
            color: '#fff',
            backgroundColor: theme.palette.primary.main
        }
    }
}));



const BroadcastMessageDialog = ({ isOpen, dialogData, openStatus, onBroadcastSellerListChange }) => {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles2();
    const [checked, setChecked] = React.useState([]);
    const [sellerList, setSellerList] = React.useState([]);
    const [broadCaseSellerList, setBroadCaseSellerList] = React.useState([]);

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen])


    useEffect(() => {
        getSellerList();
        if (sellerList.length > 0 && broadCaseSellerList.length > 0 && checked.length == 0) {
            getCheckedList()
        }
    }, []);

    useEffect(() => {
        if (sellerList.length > 0 && broadCaseSellerList.length > 0 && checked.length == 0) {
            getCheckedList()
        }
    });

    // handle selection and deselection of the sellers 
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


    function getSellerList() {
        setSellerList(sellerListData);
        setBroadCaseSellerList(broadCaseSellerListData);
    }

    const handleClose = () => {
        setOpen(false);
        openStatus(false);
    };

    function getCheckedList() {
        let checkedList = [...checked];
        sellerList.forEach(seller => {
            var findItem = broadCaseSellerList.find(x => x.id === seller.id);
            if (findItem) {
                checkedList.push(seller);
            }
        })
        setChecked(checkedList);
    }


    const handleAddSeller = () => {
        onBroadcastSellerListChange(checked);
        openStatus(false);
    };


    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" classes={{ paper: classes.dialogPaper }}>
                <DialogTitle id="form-dialog-title" color="primary" classes={{ root: classes.dialogTitle }}>
                    <div className={classes.dialogTitleSection}>
                        <Typography variant="h4">
                            Broadcast Messages(Create a Sellers Group)
                        </Typography>
                    </div>

                    <CloseIcon onClick={handleClose} style={{ float: 'right' }} />
                </DialogTitle>
                <DialogContent>
                    <div>
                        <div>
                            <List dense className={classes.root}>
                                {sellerList.map((value, index) => {
                                    const labelId = `checkbox-list-secondary-label-${value.id}`;
                                    return (
                                        <ListItem key={value.id} button className={classes.sellerRow}>
                                            <ListItemText id={labelId} primary={`${value.name}`} />
                                            <Checkbox
                                                edge="end"
                                                color="primary"
                                                checkedIcon={<Icon>done</Icon>}
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
        </div>
    );
}

export default BroadcastMessageDialog;
