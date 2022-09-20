import React, { Component, useEffect } from 'react';
import {
    Box,
    makeStyles,
    Typography,
    ListItemSecondaryAction,
    IconButton,
    Button,
    Grid
} from '@material-ui/core';

import StyleIcon from '@material-ui/icons/Style';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import './style.css';
import ActivitiTasksDialog from './ActivitiTasks';
import { getCaseActivitiTasks } from 'src/services/camundaService';
import AppConfig from 'src/appConfig';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));


export default class CaseActivities extends Component {
    static contextType = AppConfig
    constructor(props) {
        super(props);
        this.state = {
            caseInstanceId: this.props.caseInstanceId,
            caseActivitiTasks: {
                activeTasks: [],
                enabledTasks: [],
                completedTasks: []
            },
            refreshPage: false,
            openDialog: false,
            dialogData: { list: [], status: '' }
        };
    }
    componentDidMount() {
        if (this.state.caseInstanceId) {
            this.getCaseActivitiTaskList()
        }
    }

    getCaseActivitiTaskList(activitiType = '') {
        if (this.state.caseInstanceId) {
            const BASE_URL = `${this.context.appServerURL}`;
            getCaseActivitiTasks(this.state.caseInstanceId, BASE_URL).then(response => {
                if(response.success) {
                    this.setActivitiTasks(response.data , activitiType);
                }
            })
        }
    }

    setActivitiTasks(activitiTasks, status) {
        let activeTasks = [];
        let enabledTasks = [];
        let completedTasks = [];

        if (activitiTasks && activitiTasks.length > 0) {
            activitiTasks.forEach(task => {
                if (task.active) {
                    if (task.taskId != this.props.taskId) {
                        if (task.caseActivityType == 'humanTask') {
                            activeTasks.push(task);
                        }
                    }
                } else if (task.enabled) {
                    enabledTasks.push(task);
                } else if (task.completed) {
                    if (task.caseActivityType == 'humanTask') {
                        completedTasks.push(task);
                    }
                }
            });
        }
        this.setState({
            caseActivitiTasks: { activeTasks: activeTasks, enabledTasks: enabledTasks, completedTasks: completedTasks }
        });

        if(status) {
            let data = {
                list: [],
                status: status,
                title: '',
                fullTitle: ''
            };
            data.status = status
            if (status == 'active') {
                data.title = 'Active Activities';
                data.fullTitle = 'Active Activities(Running)';
                data.list = activeTasks

            } else if (status == 'available') {
                data.title = 'Enabled Activities'
                data.fullTitle = 'Enabled Activities(Available)'
                data.list = enabledTasks
            } else {
                data.title = 'Completed Activities'
                data.fullTitle = 'Completed Activities'
                data.list = completedTasks
            }

            this.setState({
                dialogData : data
            })
        }
    }


    componentDidUpdate(prevProps, prevState) {
        if (this.props.caseInstanceId !== prevProps.caseInstanceId) {
            if (!this.props.caseInstanceId) {
                this.setState({
                    caseInstanceId: null,
                    caseActivitiTasks: {
                        activeTasks: [],
                        enabledTasks: [],
                        completedTasks: []
                    },
                })
            } else {
                this.setState({
                    caseInstanceId: this.props.caseInstanceId
                });
            }

        } else if (this.state.caseInstanceId) {
            if (!this.state.caseActivitiTasks || this.state.refreshPage || (prevState.caseActivitiTasks && (this.state.caseInstanceId !== prevState.caseInstanceId))) {
                this.getCaseActivitiTaskList();
                if (this.state.refreshPage) {
                    this.setState({
                        refreshPage: false
                    })
                }
            }
        }
    }

    onGetTask(task) {
        this.props.onTaskClicked(task);
    }

    refreshCaseActivities(type) {
        // this.props.refreshTaskList();
        this.getCaseActivitiTaskList(type)
    }

    handleClickOpen(list, status) {
        let data = {
            list: list,
            status: status,
            title: '',
            fullTitle: ''
        };

        if (status == 'active') {
            data.title = 'Active Activities';
            data.fullTitle = 'Active Activities(Running)';
        } else if (status == 'available') {
            data.title = 'Enabled Activities'
            data.fullTitle = 'Enabled Activities(Available)'
        } else {
            data.title = 'Completed Activities'
            data.fullTitle = 'Completed Activities'
        }

        this.setState({
            openDialog: true,
            dialogData: data
        })
    }

    onTaskComplet() {
        this.props.onTaskComplet();
        this.setState({
            openDialog: false
        })
    }

    render() {
        if (this.state.caseInstanceId) {
            return (
                <div >
                    <div className="activiti">
                        <div className="activiti-main">
                            <div className="activiti-option"
                                onClick={() => this.handleClickOpen(this.state.caseActivitiTasks.enabledTasks, 'available')}>
                                <FolderSharedIcon color="primary" fontSize="inherit" />
                                <Typography color="primary" variant="caption" >Enabled Activities</Typography>
                            </div>
                        </div>

                        <div className="activiti-main">
                            <div className="activiti-option" onClick={() => this.handleClickOpen(this.state.caseActivitiTasks.activeTasks, 'active')}>
                                <StyleIcon color="primary" fontSize="inherit" />
                                <Typography color="primary" variant="caption">Active Activities</Typography>
                            </div>
                        </div>

                        <div className="activiti-main">
                            <div className="activiti-option" onClick={() => this.handleClickOpen(this.state.caseActivitiTasks.completedTasks, 'completed')}>
                                <StyleIcon color="primary" fontSize="inherit" />
                                <Typography color="primary" variant="caption">Completed Activities</Typography>
                            </div>
                        </div>
                    </div>
                    {/* <Grid container spacing={0} >
                        <Grid item lg={4} md={4} xs={4}>
                            <div className="activiti-option" 
                            onClick={() => this.handleClickOpen(this.state.caseActivitiTasks.enabledTasks , 'available')}>
                                <FolderSharedIcon color="primary" fontSize="inherit" />
                                <Typography color="primary" variant="caption" >Enabled Activities</Typography>
                            </div>
                        </Grid>
                        <Grid item lg={4} md={4} xs={4}>
                            <div className="activiti-option"  onClick={() => this.handleClickOpen(this.state.caseActivitiTasks.activeTasks , 'active')}>
                                <StyleIcon color="primary" fontSize="inherit" />
                                <Typography color="primary" variant="caption">Active Activities</Typography>
                            </div>
                        </Grid>
                        <Grid item lg={4} md={4} xs={4}>
                            <div className="activiti-option"  onClick={() => this.handleClickOpen(this.state.caseActivitiTasks.completedTasks , 'completed')}>
                                <StyleIcon color="primary" fontSize="inherit" />
                                <Typography color="primary" variant="caption">Completed Activities</Typography>
                            </div>
                        </Grid>
                    </Grid> */}
                    <ActivitiTasksDialog isOpen={this.state.openDialog}
                        dialogData={this.state.dialogData}
                        openStatus={() => { this.setState({ openDialog: false }) }}
                        onTaskComplet={() => this.onTaskComplet()}
                        refreshTasks = {(type) => this.refreshCaseActivities(type)}
                    />
                    {/* <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Active Activities(Running)</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Tasks list={this.state.caseActivitiTasks.activeTasks} status={'active'} onGetTask={(task) => this.onGetTask(task)} />
                        </AccordionDetails>
                    </Accordion> */}
                    {/* <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography >Enabled Activities(Available)</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Tasks list={this.state.caseActivitiTasks.enabledTasks} status={'available'} onGetTask={(task) => this.onGetTask(task)}
                                refreshTasks={() => this.refreshCaseActivities()}

                            />
                        </AccordionDetails>
                    </Accordion> */}

                    {/* <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography>Completed Activities</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Tasks list={this.state.caseActivitiTasks.completedTasks} onGetTask={(task) => this.onGetTask(task)} />
                        </AccordionDetails>
                    </Accordion> */}
                </div>
            );
        } else {
            return <p>No Activites found</p>
        }
    }
};

