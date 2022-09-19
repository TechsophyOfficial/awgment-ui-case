import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import "./style.css";
import { withStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import {
  saveTaskForm,
  completeTask,
  getTaskForm,
  getFormVariables,
} from "src/services/camundaService";
import Loader from "./loader";
import TsfFormioForm from "tsf_react_formio/dist/components/tsfFormioForm";
import "./style.css";
import { displaySuccessToast, displayErrorToast } from "src/helpers/toast";
import TOAST_MESSAGES from "src/variables/toastMessages";
import AppConfig from "src/appConfig";

const useStyles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

declare const sessionStorage: any;

type Props = {
  selectedTask: any;
  taskId:any;
  formKey:any;
  onTaskComplete: () => void;
};

class FormLayout extends Component <Props, any> {
  static contextType = AppConfig;
  constructor(props) {
    super(props);
    this.handleSubmit.bind(this);

    this.state = {
      loading: false,
      configJson: JSON.parse(sessionStorage.getItem("config")),
      formDetails: null,
      formVariables: null,
      taskId: props.taskId,
      isFormReadOnly: true,
    };
  }

  componentDidMount() {
    if (this.props.formKey) {
      this.getTaskFormDetails();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.props.selectedTask.assignee);
    if (this.props.formKey !== prevProps.formKey) {
      if (this.props.formKey) {
        this.getTaskFormDetails();
      } else {
        this.setState({
          formDetails: null,
          formVariables: null,
        });
      }
    }
  }

  setFormVariables(data) {
    let result = {};
    if (data) {
      Object.keys(data).map(function (key) {
        result[key] = data[key].value;
      });
    }
    return result;
  }

  getFormVariableDetails() {
    const GATEWAY_URL = `${this.context.apiGatewayUrl}`;
    getFormVariables(this.props.taskId, GATEWAY_URL).then((response) => {
      if (response.success) {
        console.log(response.data);
        this.setState({
          formVariables: this.setFormVariables(response.data.data),
        });
      }
    });
  }

  getTaskFormDetails() {
    this.setState({
      loading: true,
    });
    const GATEWAY_URL = `${this.context.apiGatewayUrl}`;
    getTaskForm(this.props.formKey, GATEWAY_URL).then((response) => {
      if (response.success) {
        this.setState({
          formDetails: response.data?.data,
          loading: false,
        });
        if (response.data?.data?.components) {
          this.getFormVariableDetails();
        }
      } else {
        this.setState({
          formDetails: null,
          formVariables: null,
          loading: false,
        });
      }
    });
  }

  completeSelectedTask(taskId) {
    if (taskId) {
      const BASE_URL = `${this.context.apiServerURL}`;
      completeTask(this.props.taskId, BASE_URL).then((response) => {
        if (response.success) {
          window.location.reload();
        }
      });
    }
  }

  handleSubmit = async (data) => {
    console.log(data);
    this.setState({
      loading: true,
    });
    if (data) {
      const GATEWAY_URL = `${this.context.apiGatewayUrl}`;
      saveTaskForm(this.props.taskId, data, GATEWAY_URL).then((response) => {
        console.log(response);
        if (response.success) {
          displaySuccessToast(TOAST_MESSAGES.SUCCESS.FORM_SUBMITTED);
          setTimeout(() => {
            this.setState({
              loading: false,
            });
            this.props.onTaskComplete();
          }, 2000);
        } else {
          displayErrorToast(TOAST_MESSAGES.ERROR.FORM_SUBMITTED_ERROR);
          this.setState({
            loading: false,
          });
        }
      });
    }
  };

  render() {
    return (
      <div>
        <Grid container>
          <Grid item lg={ 12 } md={ 12 } sm={ 12 } className={ "" }>
            {/* <AppBar position="relative" color="transparent" variant="dense" className={'buyer-head'}>
                            <Toolbar>
                                <Grid container spacing={0} >
                                    <Grid item lg={6} md={6} xs={12}>
                                        <Typography variant="h5">
                                            {(this.state.configJson) ? this.state.configJson.headings.form.main : ''}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Toolbar>
                        </AppBar> */}

            <div style={ { position: "relative" } }>
              { this.state.loading && <Loader /> }
              <Paper className={ "form-layout" } elevation={0}>
                <TsfFormioForm
                  form={ this.state.formDetails }
                  options={ {
                    readOnly: this.props.selectedTask.assignee ? false : true,
                  } }
                  submission={
                    this.state.formVariables && {
                      data: this.state.formVariables,
                    }
                  }
                  onSubmit={ (submission) => {
                    this.handleSubmit(submission.data);
                  } }
                  onCustomEvent={ ({ success, data }) => {
                    if (success) {
                      this.handleSubmit(data?.formData);
                    }
                  } }
                />
              </Paper>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(useStyles)(FormLayout);
