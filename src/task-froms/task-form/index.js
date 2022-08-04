import React, { useState, useEffect, Component } from 'react';
import {
    Box,
    Container,
    makeStyles,
    Grid,
    Typography,
    Button
} from '@material-ui/core';
import './style.css';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/styles';
import { saveTaskForm, claimTask, completeTask, getTask } from 'src/services/camundaService';


// const useStyles = makeStyles((theme) => ({
//     root: {
//         backgroundColor: theme.palette.background.dark,
//         minHeight: '100%',
//         paddingBottom: theme.spacing(3),
//         paddingTop: theme.spacing(3)
//     }
// }));


const useStyles = theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
});



class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskDetails: null,
            taskId: this.props.taskId,
            username: '',
            age: ''
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
            }
        }
    }

    getTaskDetails() {
        getTask(this.props.taskId).then(response => {
            if (response.success) {
                response.formKey = '123';
                this.setState({
                    taskDetails: response.data,
                    taskId: this.props.taskId
                })
            }
        })
        // fetch(`${process.env.REACT_APP_SERVER_URL}/task/${this.props.taskId}`,
        //     {
        //         "method": "GET",
        //         "headers": {
        //             "Authorization": "Bearer " + localStorage.getItem('react-token'),
        //         }
        //     })
        //     .then(response => response.json())
        //     .then(response => {
        //         response.formKey = '123';
        //         this.setState({
        //             taskDetails: response,
        //             taskId: this.props.taskId
        //         })
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
    }

    renderTaskActions = () => {
        if (this.state.taskDetails && this.state.taskDetails.assignee) {
            return (
                <div className="task-form-actions">
                    {this.state.taskDetails.formKey ? <Button onClick={() => this.saveForm(this.state.taskDetails.id)} color="seconday" >
                        Save
                     </Button> : <span></span>}

                    <Button onClick={() => this.completeSelectedTask(this.state.taskDetails.id)} color="primary" >
                        Complete
                </Button>
                </div>
            )
        } else if (this.state.taskDetails && !this.state.taskDetails.assignee) {
            return (
                <div className="task-form-actions">
                    <Button onClick={() => this.claimSelectedTask(this.state.taskDetails.id)} color="primary" >
                        Claim
                </Button>
                </div>
            )
        } else {
            return <div></div>
        }
    }

    saveForm(taskId) {
        if (taskId) {
            let body = {
                'name': this.state.username,
                'age': this.state.age
            };
            saveTaskForm(this.props.taskId, body).then(response => {
                if (response.success) {
                    window.location.reload();
                }
            })
            // fetch(`${process.env.REACT_APP_SERVER_URL}/task/${this.props.taskId}/submit-form`,
            //     {
            //         method: "POST",
            //         headers: {
            //             "content-type": "application/json",
            //             "accept": "application/json"
            //         },
            //         body: JSON.stringify({
            //             'name': this.state.username,
            //             'age': this.state.age
            //         })
            //     })
            //     .then(response => response.json())
            //     .then(response => {
            //         window.location.reload();
            //     })
            //     .catch(err => {
            //         window.location.reload();
            //         console.log(err);
            //     });
        }
    }

    completeSelectedTask(taskId) {
        if (taskId) {
            completeTask(this.props.taskId).then(response => {
                if (response.success) {
                    window.location.reload();
                }
            })
            // fetch(`${process.env.REACT_APP_SERVER_URL}/task/${this.props.taskId}/complete`,
            //     {
            //         method: "POST",
            //         headers: {
            //             "content-type": "application/json",
            //             "accept": "application/json"
            //         },
            //         body: JSON.stringify({})
            //     })
            //     .then(response => {
            //         return (response && (!response.status == 201)) ? response.json() : {}
            //     })
            //     .then(response => {
            //         window.location.reload();
            //     })
            //     .catch(err => {
            //         window.location.reload();
            //         console.log(err);
            //     });
        }
    }



    claimSelectedTask(taskId) {
        if (taskId) {
            let body = {
                "userId": localStorage.getItem('currentUser')
            }
            claimTask(this.props.taskId, body).then(response => {
                if (response.success) {
                    window.location.reload();
                }
            })
            // fetch(`${process.env.REACT_APP_SERVER_URL}/task/${this.props.taskId}/claim`,
            //     {
            //         "method": "POST",
            //         "headers": {
            //             "content-type": "application/json",
            //             "accept": "application/json"
            //         },
            //         "body": JSON.stringify({
            //             "userId" : localStorage.getItem('currentUser')
            //         })
            //     })
            //     .then(response => response.json())
            //     .then(response => {
            //         window.location.reload();
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     });
        }
    }

    myChangeHandler = (event) => {
        this.setState({ username: event.target.value });
    }

    mySelectChangeHandler = (event) => {
        this.setState({ age: event.target.value });
    }
    render() {
        const taskFormId = this.props.taskId;
        const classes = useStyles;
        return (
            <div className="task-form">
                <form noValidate autoComplete="off">
                    <div>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                            <Select
                                onChange={this.mySelectChangeHandler}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={this.state.age}
                            // value={age}
                            // onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <TextField id="standard-basic" label="Standard" onChange={this.myChangeHandler} />
                    </div>

                </form>
                {this.renderTaskActions()}
            </div>
        );
    }
};

export default withStyles(useStyles)(TaskForm)

