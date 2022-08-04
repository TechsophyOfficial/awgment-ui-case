import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
    makeStyles,
    Typography,
    Grid,
    Box
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton
} from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PersonIcon from '@material-ui/icons/Person';
import DeleteIcon from '@material-ui/icons/Delete';
import WebAssetIcon from '@material-ui/icons/WebAsset';
import theme from '../../../theme';
import CheckIcon from '@material-ui/icons/Check';
import TaskDetail from '../../../views/task/task-detail';
import { manualStartActiviti, completeTask, claimTask, getTask } from 'src/services/camundaService';
import { displaySuccessToast } from 'src/helpers/toast';
import TOAST_MESSAGES from 'src/variables/toastMessages';


const useStyles = makeStyles(() => ({
    dialogPaper: {
        minHeight: '80vh',
        maxHeight: '80vh',
        minWidth: '62%',
        '& .MuiDialogContent-root' :{
            padding : '8px 0px'
        },
        '& .MuiAccordionSummary-content p' : {
            fontSize : 18,
            fontWeight : 500,
            color : '#000'
        },
        '& .MuiPaper-elevation1' : {
            boxShadow : 'none'
        }
    },
    dialogTitle: {
        color: theme.palette.text.header,
        '& h2': {
            fontSize : 18
        }       
    }
}));

const Tasks = ({ list, status, onGetTask, refreshTasks }) => {
    function getTaskForm(task) {
        onGetTask(task);
    }

    function startActiviti(task) {
        if (task.caseExecutionId) {
            manualStartActiviti(task.caseExecutionId , {}).then(response => {
                    displaySuccessToast(TOAST_MESSAGES.SUCCESS.ACTIVITI_STARTED)  
                    refreshTasks('available');
            })
        }
    }

    if (status == 'active') {
        return (
            <List component="nav" aria-label="main mailbox folders"> {
                list && list.map((task) =>

                    <ListItem button onClick={() => getTaskForm(task)}>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary={task.caseActivityName} />
                    </ListItem>

                )
            }</List>
        )
    } else if (status == 'available') {
        return (
            <List component="nav" aria-label="main mailbox folders"> {
               list && list.map((task) =>

                    <ListItem>
                        <ListItemIcon>
                            <WebAssetIcon />
                        </ListItemIcon>
                        <ListItemText primary={task.caseActivityName} />
                        <Button color="primary" onClick={() => startActiviti(task)}>Start</Button>
                    </ListItem>

                )
            }</List>
        )
    } else {
        return (
            <List component="nav" aria-label="main mailbox folders"> {
              list &&  list.map((task) =>

                    <ListItem button>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary={task.caseActivityName} />
                    </ListItem>

                )
            }</List>
        )
    }

}

Tasks.propTypes = {
    list: PropTypes.array.isRequired
};

const ActivitiTasksDialog = ({ isOpen, dialogData, isEdit, openStatus, onTaskComplet, refreshTasks }) => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);
    const [taskId, setTaskId] = useState(null);
    const [taskDetails, setTaskDetails] = useState(null);



    useEffect(() => {
        setOpen(isOpen);
        setTaskId(null);
    }, [isOpen])


    // useEffect((prev) => {
    //     setOpen(isOpen);
    //     setTaskId(null);
    // }, [taskId])

    const handleClose = () => {
        setOpen(false);
        openStatus(false);
    };

    function onGetTask(task) {
        setTaskId(task.taskId)
        // setTaskDetails(task);
        getTaskDetails(task.taskId)
    }

    function completeSelectedTask() {
        if (taskId) {
            completeTask(this.props.taskId).then(response => {
                if (response.success) {
                    onTaskComplet();
                }
            })
        }
    }

    function claimSelectedTask() {
        if (taskId) {
            let body = {
                "userId": localStorage.getItem('currentUser')
            }
            claimTask(this.props.taskId, body).then(response => {
                if (response.success) {
                    onTaskComplet();
                }
            })
        }
    }

    function refreshTaskList(type) {
        refreshTasks(type)
    }

    function getTaskDetails(taskId) {
        getTask(this.props.taskId).then(response => {
            if (response.success) {
                setTaskDetails(response.data);
            }
        })
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" classes={{ paper: classes.dialogPaper }}>
                <DialogTitle id="activiti-dialog-title" color="primary" classes={{ root: classes.dialogTitle }}>
                    {dialogData.title}
                    <CloseIcon onClick={handleClose} style={{ float: 'right' }} />
                </DialogTitle>
                <DialogContent className={'activiti-dialog-content'}>
                    <Grid container>
                        <Grid item lg={5} md={5} sm={12} >
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>{dialogData.fullTitle}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Tasks list={dialogData.list} status={dialogData.status} onGetTask={onGetTask} refreshTasks={refreshTaskList}/>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid item lg={7} md={7} sm={12}>
                            <div className={'activiti-task-details'}>
                            { taskId && taskDetails &&   <Box pl={4}>
                              <Typography variant="h5">
                                       {taskDetails.name}
                                    </Typography>
                                
                                    {taskId && taskDetails && taskDetails.assignee &&
                                        <Typography onClick={() => completeSelectedTask()}
                                            variant='body2' color="primary" style={{ float: 'right', display: 'flex' }}>
                                            <CheckIcon color="primary" fontSize="small" />
                                            <span>Complete</span>
                                        </Typography>
                                    }

                                    {taskId && taskDetails && !taskDetails.assignee &&
                                        <Typography onClick={() => claimSelectedTask()}
                                            variant='body2' color="primary" style={{ float: 'right', display: 'flex' }}>
                                            <CheckIcon color="primary" fontSize="small" />
                                            <span>Claim</span>
                                        </Typography>
                                    }
                                </Box>
                            }
                                {taskId && <TaskDetail taskId={taskId}
                                    onTaskComplet={() => refreshTaskList()}

                                />
                                }
                                
                            </div> 
                        </Grid>
                    </Grid>

                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ActivitiTasksDialog;
