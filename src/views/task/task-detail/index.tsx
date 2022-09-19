import React, { Component } from 'react';
import {
    Typography,
    Button
} from '@material-ui/core';
import './style.css';
import Moment from 'react-moment';
import Components from '../../../task-froms/components';
import { getTask, completeTask, claimTask } from 'src/services/camundaService';
import AppConfig from 'src/appConfig';

declare const sessionStorage: any;

export default class TaskDetail extends Component <any, any> {
    static contextType = AppConfig
    constructor(props) {
        super(props);
        this.state = {
            taskDetails: null,
            taskId: this.props.taskId
        };
    }

    componentDidMount() {
        if (this.props.taskId) {
            this.getTaskDetails();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.taskId !== prevProps.taskId) {
            if (this.props.taskId) {
                this.getTaskDetails();
            } else {
                this.setState({ taskDetails: null })
            }
        }
    }

    getTaskDetails() {
        const BASE_URL = `${this.context.appServerURL}`;
        getTask(BASE_URL, this.props.taskId).then(response => {
            if (response.success) {
                this.setState({
                    taskDetails: response.data,
                    taskId: this.props.taskId
                })
            }
        });
    }

    renderCaseDetails = () => {
        if (this.state.taskDetails) {
            return (
                <div>
                    <Typography color="textPrimary" variant="h3" >
                        {this.state.taskDetails.name}
                    </Typography>
                    <Typography color="textSecondary" variant="body1" >
                        {this.state.taskDetails.assignee ? 'Assignee :' + this.state.taskDetails.assignee : 'No Assignee'}
                    </Typography>
                    <Typography color="textSecondary" variant="body1" >
                        Created :  <Moment format="YYYY/MM/DD HH:mm">{this.state.taskDetails.created}
                        </Moment>
                    </Typography>
                </div>
            )
        } else {
            return <div></div>
        }
    };

    renderTaskActions = () => {
        if (this.state.taskDetails && this.state.taskDetails.assignee && !this.state.taskDetails.formKey) {

            const config = JSON.parse(sessionStorage.getItem('config'));

            if (this.state.taskDetails &&
                config &&
                config.form_component &&
                config.form_component[this.state.taskDetails.taskDefinitionKey] &&
                config.form_component[this.state.taskDetails.taskDefinitionKey].component) {
                return <div></div>
            }
            else {
                return (
                    <div className="task-form-actions">
                        <Button onClick={() => this.completeTask(this.state.taskDetails.id)} color="primary" >
                            Complete
                            </Button>
                    </div>
                )
            }

        } else if (this.state.taskDetails && !this.state.taskDetails.assignee) {
            return (
                <div className="task-form-actions">
                    <Button onClick={() => this.claimTask(this.state.taskDetails.id)} color="primary" >
                        Claim
                </Button>
                </div>
            )
        } else {
            return <div></div>
        }
    }

    completeTask(taskId) {
        if (taskId) {
            const BASE_URL = `${this.context.appServerURL}`;
            completeTask(this.props.taskId, BASE_URL).then(response => {
                if (response.success) {
                    this.props.onTaskComplet();
                }
            })
            // fetch(`${process.env.REACT_APP_SERVER_URL}/task/${this.props.taskId}/complete`,
            //     {
            //         "method": "POST",
            //         "headers": {
            //             "content-type": "application/json",
            //             "accept": "application/json",
            //             "Authorization": "Bearer " + localStorage.getItem('react-token'),
            //         },
            //         "body": JSON.stringify({})
            //     })
            //     .then(response => {
            //         return (response && (!response.status == 201)) ? response.json() : {}
            //     })
            //     .then(response => {
            //         this.props.onTaskComplet();
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     });
        }
    }

    claimTask(taskId) {
        if (taskId) {
            let body = {
                "userId": localStorage.getItem('currentUser')
            }
            const GATEWAY_URL = `${this.context.apiGatewayUrl}`;
            claimTask(this.props.taskId, body, GATEWAY_URL).then(response => {
                if (response.success) {
                    this.props.onTaskComplet();
                }
            })
            // fetch(`${process.env.REACT_APP_SERVER_URL}/task/${this.props.taskId}/claim`,
            //     {
            //         "method": "POST",
            //         "headers": {
            //             "content-type": "application/json",
            //             "accept": "application/json",
            //             "Authorization": "Bearer " + localStorage.getItem('react-token'),
            //         },
            //         "body": JSON.stringify({
            //             "userId": localStorage.getItem('currentUser')
            //         })
            //     })
            //     .then(response => {
            //         return (response && (!response.status == 201)) ? response.json() : {}
            //     })
            //     .then(response => {
            //         this.props.onTaskComplet();
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     });
        }
    }

    rederForm(taskId) {
        const config = JSON.parse(sessionStorage.getItem('config'));

        if (this.state.taskDetails &&
            config &&
            config.form_component &&
            config.form_component[this.state.taskDetails.taskDefinitionKey] &&
            config.form_component[this.state.taskDetails.taskDefinitionKey].component) {

            // #4
            const block = {
                component: config.form_component[this.state.taskDetails.taskDefinitionKey].component,
                taskId: this.state.taskId
            }

            return (
                <div>
                    {Components(block)}
                </div>

            )

        }
    }
    render() {
        return (
            <div className="task-form-wrapper">
                {this.renderCaseDetails()}
                {this.rederForm(this.props.taskId)}
                {this.renderTaskActions()}
            </div>
        );
    }
};

