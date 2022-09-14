import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Box, makeStyles } from "@material-ui/core";
import CaseActivities from "../../views/case/case-activities";
import { Grid } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import theme from "../../theme";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Check } from "react-feather";
import CloseIcon from "@material-ui/icons/Close";
import MyChecklists from "./checklist";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Comments from "./comments.js";
import Loader from "./loader";
import {
  getCaseInstance,
  completeTask,
  claimTask,
} from "src/services/camundaService";
import TOAST_MESSAGES from "src/variables/toastMessages";
import { displayErrorToast, displaySuccessToast } from "src/helpers/toast";
import FormLayout from "./FormLayout";
import AppConfig from "src/appConfig";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={0}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "transpaent",
    border: "1px solid #ccc",
    "& .MuiTab-wrapper": {
      fontSize: 12,
      fontWeight: 500,
      textTransform: "capitalize",
    },
    "& .MuiAppBar-root": {
      boxShadow: "none",
      minWidth: 100,
    },
    "& .MuiTab-root": {
      minWidth: 100,
    },
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  topMenu: {
    marginTop: "36px",
    "&>div": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.text.header,
    },
  },
}));

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const CaseDetails = ({ className, selectedTask, onTaskComplet, ...rest }) => {
  const classes = useStyles();
  // const [taskId, setTaskId] = useState(selectedTask);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState(0);
  const [caseDetails, setCaseDetails] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const appData = useContext(AppConfig)
  useEffect(() => {
    setLoading(true);
    getCaseDetails();
  }, [selectedTask]);

  // fetch the case details using case instance id
  function getCaseDetails() {
    if (selectedTask && selectedTask.caseInstanceId) {
      const BASE_URL = `${appData.apiServerURL}`;
      getCaseInstance(selectedTask.caseInstanceId, BASE_URL).then((response) => {
        if (response.success) {
          if (response.data) {
            setCaseDetails(response.data);
            setLoading(false);
          }
        }
        if (!response.success) {
          setLoading(false);
        }
      });
      // fetch(`${process.env.REACT_APP_SERVER_URL}/case-instance/${selectedTask.caseInstanceId}`, {
      //     "method": "GET",
      //     "headers": {
      //         "content-type": "application/json",
      //         "accept": "application/json",
      //         "Authorization": "Bearer " + localStorage.getItem('react-token'),
      //     }
      // })
      //     .then(presponse => presponse.json())
      //     .then(response => {
      //         if (response) {
      //             setCaseDetails(response);
      //             setLoading(false)
      //         }
      //     })
      //     .catch(err => {
      //         setLoading(false)
      //         console.log(err);
      //     });
    } else {
      setLoading(false);
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // complete the selected task
  const completeSelectedTask = () => {
    if (selectedTask) {
      const BASE_URL = `${appData.apiServerURL}`;
      completeTask(selectedTask.id, BASE_URL).then((response) => {
        if (response.success) {
          displaySuccessToast(TOAST_MESSAGES.SUCCESS.TASK_COMPLETED);
          onTaskComplet();
          setAnchorEl(null);
        }
        if (!response.success) {
          displayErrorToast(TOAST_MESSAGES.ERROR.TASK_NOT_COMPLETED);
          setAnchorEl(null);
        }
      });
      // fetch(`${process.env.REACT_APP_SERVER_URL}/task/${selectedTask.id}/complete`,
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
      //         onTaskComplet();
      //         setAnchorEl(null);
      //     })
      //     .catch(err => {
      //         console.log(err);
      //     });
    }
  };

  // claim selected task
  const claimSelectedTask = () => {
    if (selectedTask) {
      let body = {
        taskId: selectedTask.id,
        assignee: localStorage.getItem("currentUser"),
      };
      const GATEWAY_URL = `${appData.apiGatewayUrl}`;
      claimTask(selectedTask.id, body, GATEWAY_URL).then((response) => {
        if (response.success) {
          onTaskComplet();
          setAnchorEl(null);
        }
        if (!response.success) {
          displayErrorToast(TOAST_MESSAGES.ERROR.TASK_NOT_CLAIMED);
          setAnchorEl(null);
        }
      });
      // fetch(`${process.env.REACT_APP_SERVER_URL}/task/${selectedTask.id}/claim`,
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
      //         onTaskComplet();
      //         setAnchorEl(null);
      //     })
      //     .catch(err => {
      //         console.log(err);
      //     });
    }
  };

  // useEffect(() => {
  //   setTaskId(null);
  // }, [selectedTask]);

  function onTaskClicked(task) {
    // setTaskId(task.taskId);
  }

  function refreshTaskList() {
    onTaskComplet();
  }

  return (
    <div style={{ position: "relative" }}>
      {loading && <Loader position={"absolute"} />}

      <AppBar
        position="relative"
        color={theme.palette.background.default}
        style={{ zIndex: "999" }}
      >
        <Toolbar>
          <Grid container alignItems="center" justify="center">
            <Grid item lg={5} md={3} sm={12} xs={12}>
              <Typography variant="h4" style={{ fontWeight: "700" }}>
                {" "}
                {caseDetails ? caseDetails.businessKey : ""}
              </Typography>
            </Grid>
            <Grid item lg={6} md={8} sm={11} xs={11}>
              {/* case activities */}
              <CaseActivities
                taskId={selectedTask ? selectedTask.id : null}
                caseInstanceId={
                  selectedTask ? selectedTask.caseInstanceId : null
                }
                onTaskClicked={onTaskClicked}
                refreshTaskList={() => refreshTaskList()}
                onTaskComplet={() => refreshTaskList()}
              />
            </Grid>
            <Grid item lg={1} md={1} sm={1} xs={1}>
              {/* menu */}
              {selectedTask && !selectedTask.endTime && (
                <Button
                  aria-controls="simple-menu"
                  id="action-btn"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon></MoreVertIcon>
                </Button>
              )}
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className={classes.topMenu}
              >
                {selectedTask && selectedTask.assignee && (
                  <MenuItem onClick={completeSelectedTask}>
                    <Check />
                    Complete Task
                  </MenuItem>
                )}
                {selectedTask && !selectedTask.assignee && (
                  <MenuItem onClick={claimSelectedTask}>
                    <Check />
                    Claim Task
                  </MenuItem>
                )}

                {selectedTask && selectedTask.assignee && (
                  <MenuItem onClick={handleClose}>
                    <CloseIcon />
                    Cancel Transaction
                  </MenuItem>
                )}
              </Menu>
            </Grid>
            {/* <Grid item lg={1} md={1} sm={6}>
                            <RefreshIcon />
                        </Grid> */}
          </Grid>
        </Toolbar>
      </AppBar>
      {/* <TransactionSummary selectedTask={selectedTask} /> */}

      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            // variant="fullWidth"
            aria-label="full width tabs example"
            className={"task-tabs"}
          >
            <Tab label="Form" {...a11yProps(0)} />

            <Tab label="Comments" {...a11yProps(1)} />

            <Tab label="Checklist" {...a11yProps(2)} />

            {/* <Tab label="Quote Summary" {...a11yProps(1)} /> */}
            {/* <Tab label="Conversations" {...a11yProps(2)} /> */}
            {/* <Tab label="Documents" {...a11yProps(1)} /> */}
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0} dir={theme.direction}>
          {selectedTask && selectedTask.formKey && (
            <FormLayout
              selectedTask={selectedTask}
              taskId={selectedTask.id}
              formKey={selectedTask.formKey}
              onTaskComplete={() => refreshTaskList()}
            />
          )}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Comments
            selectedTask={selectedTask ? selectedTask : null}
            businessKey={caseDetails?.businessKey}
          />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <MyChecklists selectedTask={selectedTask} />
        </TabPanel>
        {/* <TabPanel value={value} index={1} dir={theme.direction}>
                    <QuoteSummary selectedTask={selectedTask ? selectedTask : null} />
                </TabPanel> */}
        {/* <TabPanel value={value} index={2} dir={theme.direction}>
                <Conversation selectedTask={selectedTask ? selectedTask : null} />
                </TabPanel> */}
        {/* <TabPanel value={value} index={1} dir={theme.direction}>
                    Documents
                </TabPanel> */}
      </div>
    </div>
  );
};

CaseDetails.propTypes = {
  className: PropTypes.string,
};

export default CaseDetails;
