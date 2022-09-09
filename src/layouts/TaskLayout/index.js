import React, { Component } from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import Search from "../../views/filter/search";
import CaseDetails from "./CaseDetails";
import "./style.css";
import TaskList from "./TaskList";
import Loader from "./loader";
import Sorting from "./Sorting";
import {
  TASKS_PER_PAGE,
  ASSIGNEE,
  CANDIDATE,
  STATE_COMPLETED,
  ASCENDING,
  DESCENDING,
} from "src/variables/taskVariables";
import {
  getTasksCount,
  getTasks,
  getCaseDefinition,
  getCaseVariables,
} from "src/services/camundaService";
import AppConfig from "src/appConfig";

export default class TaskLayout extends Component {
  static contextType = AppConfig;
  constructor(props) {
    super(props);
    this.state = {
      assignment: props.assignment,
      state: props.state,
      tasklist: [],
      selectedTask: null,
      queryParam: null,
      searchFlag: false,
      leftGridValues: [2, 3, 12],
      rightGridValues: [10, 9, 12],
      changeLeftGridFlag: false,
      totalTasks: 0,
      page: 0,
      refreshTasks: false,
      loading: false,
      selectedSortingOptions: [],
      taskCompletedFlag: false,
    };

    this.onTaskClicked = this.onTaskClicked.bind(this);
    this.loadMoreTasks = this.loadMoreTasks.bind(this);
    // this.collapseLeftSection = this.collapseLeftSection.bind(this);
    this.getTasksCount = this.getTasksCount.bind(this);
  }

  componentDidMount() {
    this.state.loading = true;
    // this.getTasksCount();
    // this.getTasks();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchFlag) {
      this.state.loading = true;
      this.getTasksCount();
      this.getTasks();
      this.state.searchFlag = !this.state.searchFlag;
    }
    if (prevState.selectedSortingOptions != this.state.selectedSortingOptions) {
      this.setState({
        loading: true,
        tasklist: [],
        totalTasks: 0,
        taskCompletedFlag: true,
      });
      this.getTasksCount();
      this.getTasks();
    }
    if (prevState.page != this.state.page) {
      this.state.loading = true;
      this.getTasks();
    }
    if (this.state.refreshTasks) {
      this.state.loading = true;
      this.getTasksCount();
      this.getTasks();
      this.state.refreshTasks = false;
    }
    if (this.state.taskCompletedFlag) {
      this.setState({ taskCompletedFlag: false });
    }
  }

  getRequestBody() {
    let query = {};
    query["sorting"] = [];

    if (this.state.state == STATE_COMPLETED) {
      query["taskAssignee"] = localStorage.getItem("currentUser");
      query["finished"] = true;

      if (this.state.selectedSortingOptions.length > 0) {
        this.state.selectedSortingOptions.map((value) => {
          query.sorting.push({ sortBy: value.id, sortOrder: value.value });
        });
      }

      if (this.state.queryParam) {
        if (this.state.queryParam.category) {
          query[this.state.queryParam.category] = [
            {
              name: this.state.queryParam.id,
              operator: "eq",
              value: this.state.queryParam.value,
            },
          ];
        } else {
          query[this.state.queryParam.id] = this.state.queryParam.value;
        }
      }
    } else if (this.state.assignment == ASSIGNEE) {
      query["assignee"] = localStorage.getItem("currentUser");

      if (this.state.selectedSortingOptions.length > 0) {
        this.state.selectedSortingOptions.map((value) => {
          if (value.parameters) {
            query.sorting.push({
              sortBy: value.id,
              sortOrder: value.value,
              parameters: value.parameters,
            });
          } else {
            query.sorting.push({ sortBy: value.id, sortOrder: value.value });
          }
        });
      }

      if (this.state.queryParam) {
        if (this.state.queryParam.category) {
          query[this.state.queryParam.category] = [
            {
              name: this.state.queryParam.id,
              operator: "eq",
              value: this.state.queryParam.value,
            },
          ];
        } else {
          query[this.state.queryParam.id] = this.state.queryParam.value;
        }
      }
    } else if (this.state.assignment == CANDIDATE) {
      query["candidateUser"] = localStorage.getItem("currentUser");

      if (this.state.selectedSortingOptions.length > 0) {
        this.state.selectedSortingOptions.map((value) => {
          query.sorting.push({ sortBy: value.id, sortOrder: value.value });
        });
      }

      if (this.state.queryParam) {
        if (this.state.queryParam.category) {
          query[this.state.queryParam.category] = [
            {
              name: this.state.queryParam.id,
              operator: "eq",
              value: this.state.queryParam.value,
            },
          ];
        } else {
          query[this.state.queryParam.id] = this.state.queryParam.value;
        }
      }
    } else {
      query["active"] = true;
      if (this.state.selectedSortingOptions.length > 0) {
        this.state.selectedSortingOptions.map((value) => {
          query.sorting.push({ sortBy: value.id, sortOrder: value.value });
        });
      }

      if (this.state.queryParam) {
        if (this.state.queryParam.category) {
          query[this.state.queryParam.category] = [
            {
              name: this.state.queryParam.id,
              operator: "eq",
              value: this.state.queryParam.value,
            },
          ];
        } else {
          query[this.state.queryParam.id] = this.state.queryParam.value;
        }
      }
    }

    return query;
  }

  // get the query parameters for count api
  getTaskQueryParam() {
    let query = "";
    query += "?page=" + this.state.page + "&size=" + TASKS_PER_PAGE;
    return query;
  }

  // get request url and method for respective api's
  getRequestObject() {
    const queryParam = this.getTaskQueryParam();
    let request = { url: "", method: "" };
    if (this.state.state == STATE_COMPLETED) {
      request.url = `${this.context.apiGatewayUrl}/workflow/v1/task${queryParam}`;
      request.method = "POST";
    } else if (this.state.assignment == ASSIGNEE) {
      request.url = `${this.context.apiGatewayUrl}/workflow/v1/tasks${queryParam}`;
      request.method = "POST";
    } else if (this.state.assignment == CANDIDATE) {
      request.url = `${this.context.apiGatewayUrl}/workflow/v1/tasks${queryParam}`;
      request.method = "POST";
    } else {
      request.url = `${this.context.apiGatewayUrl}/workflow/v1/tasks${queryParam}`;
      request.method = "POST";
    }

    return request;
  }

  // get count of tasks
  getTasksCount() {
    let url = "";
    if (this.state.state == STATE_COMPLETED) {
      url = `${this.context.apiGatewayUrl}/workflow/v1/task/count`;
    } else if (this.state.assignment == ASSIGNEE) {
      url = `${this.context.apiGatewayUrl}/workflow/v1/tasks/count`;
    } else if (this.state.assignment == CANDIDATE) {
      url = `${this.context.apiGatewayUrl}/workflow/v1/tasks/count`;
    } else {
      url = `${this.context.apiGatewayUrl}/workflow/v1/tasks/count`;
    }

    getTasksCount(url, JSON.stringify(this.getRequestBody())).then(
      (response) => {
        if (response.success) {
          this.setState({
            totalTasks: response.data.data.count,
          });
        }
        // return this.setState({ errors: response.errors });
      }
    );

    // fetch(url, {
    //   "method": "POST",
    //   "headers": {
    //     "Authorization": "Bearer " + localStorage.getItem('react-token'),
    //     "content-type": "application/json",
    //     "accept": "application/json"
    //   },
    //   "body": JSON.stringify(this.getRequestBody())
    // })
    //   .then(response => response.json())
    //   .then(response => {
    //     // this.state.loading = false;
    //     this.setState({
    //       totalTasks: response.count
    //     })

    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }

  // get list of the tasks
  getTasks() {
    const getRequestObject = this.getRequestObject();
    getTasks(getRequestObject.url, this.getRequestBody()).then((response) => {
      if (response.success) {
        let taskList;
        if (response.data.hasOwnProperty("rows")) taskList = response.data.rows;
        else taskList = response.data.data;

        let index = 0;
        if (taskList.length > 0) {
          taskList.forEach((task) => {
            if (task.caseDefinitionId) {
              const BASE_URL = `${this.context.apiServerURL}`;
              getCaseDefinition(task.caseDefinitionId, BASE_URL).then((response) => {
                if (response.success) {
                  let presponse = response.data;
                  task["processName"] = presponse.name
                    ? presponse.name
                    : presponse.key;
                  task["caseKey"] = presponse.key;

                  index = index + 1;
                  if (index == taskList.length) {
                    this.getTaskVariable(taskList);
                  }
                }
                if (!response.success) {
                  this.state.loading = false;
                  index = index + 1;
                }
              });
            } else {
              index = index + 1;
              if (index == taskList.length) {
                this.getTaskVariable(taskList);
              }
            }
          });
        } else {
          this.setState({
            loading: false,
            selectedTask: null,
          });
          this.setTaskList(taskList);
        }
      }
      if (!response.success) {
        this.setState({ loading: false });
      }
    });
    // fetch(getRequestObject.url, {
    //   "method": getRequestObject.method,
    //   "headers": {
    //     "content-type": "application/json",
    //     "accept": "application/json",
    //     "Authorization": "Bearer " + localStorage.getItem('react-token'),
    //   },
    //   "body": JSON.stringify(this.getRequestBody())
    // })
    //   .then(response => response.json())
    //   .then(taskList => {
    //     let index = 0;
    //     if (taskList.length > 0) {
    //       taskList.forEach((task) => {
    //         if (task.caseDefinitionId) {
    //           fetch(`${process.env.REACT_APP_SERVER_URL}/case-definition/${task.caseDefinitionId}`, {
    //             "method": "GET",
    //             "headers": {
    //               "Authorization": "Bearer " + localStorage.getItem('react-token'),
    //             }
    //           })
    //             .then(presponse => presponse.json())
    //             .then(presponse => {
    //               task['processName'] = presponse.name ? presponse.name : presponse.key;
    //               task['caseKey'] = presponse.key;

    //               index = index + 1;
    //               if (index == taskList.length) {
    //                 this.getTaskVariable(taskList);
    //               }
    //             })
    //             .catch(err => {
    //               this.state.loading = false;
    //               index = index + 1;
    //               console.log(err);
    //             });
    //         } else {
    //           index = index + 1;
    //           if (index == taskList.length) {
    //             this.getTaskVariable(taskList);
    //           }
    //         }
    //       });
    //     } else {
    //       this.setState({
    //         loading: false,
    //         selectedTask: null
    //       })
    //       this.setTaskList(taskList);
    //     }

    //   })
    //   .catch(err => {
    //     this.state.loading = false;
    //     console.log(err);
    //   });
  }

  // set the task list and select fist one as default
  setTaskList(taskList) {
    const uniqueTasks = [];
    if (taskList.length > 0 && !(this.state.page == 0)) {
      this.state.tasklist.concat(taskList).map((item) => {
        var findItem = uniqueTasks.find((x) => x.id === item.id);
        if (!findItem) {
          uniqueTasks.push(item);
        }
      });
    } else if (taskList.length > 0 && this.state.page == 0) {
      taskList.map((item) => {
        uniqueTasks.push(item);
      });
    }
    this.setState({
      tasklist: uniqueTasks,
      selectedTask:
        this.state.tasklist.length == 0 || this.state.refreshTasks
          ? taskList[0]
          : this.state.tasklist[0],
    });
  }

  // get task variables
  getTaskVariable(taskList) {
    let index = 0;
    taskList.forEach((task) => {
      if (task.caseDefinitionId) {
        const BASE_URL = `${this.context.appServerURL}`
        getCaseVariables(task.caseInstanceId, BASE_URL).then((response) => {
          if (response.success) {
            task["variables"] = response.data;
            index = index + 1;
            if (index == taskList.length) {
              this.setState({ loading: false });
              this.setTaskList(taskList);
            }
          }
          if (!response.success) {
            this.setState({ loading: false });
            index = index + 1;
          }
        });
        // fetch(`${process.env.REACT_APP_SERVER_URL}/case-instance/${task.caseInstanceId}/variables`, {
        //   "method": "GET",
        //   "headers": {
        //     "Authorization": "Bearer " + localStorage.getItem('react-token'),
        //   }
        // })
        //   .then(presponse => presponse.json())
        //   .then(response => {
        //     task['variables'] = response;
        //     index = index + 1;
        //     if (index == taskList.length) {
        //       this.state.loading = false;
        //       this.setTaskList(taskList);
        //     }
        //   })
        //   .catch(err => {
        //     this.state.loading = false;
        //     index = index + 1;
        //     console.log(err);
        //   });
      } else {
        index = index + 1;
        if (index == taskList.length) {
          this.setState({ loading: false });
          this.setTaskList(taskList);
        }
      }
    });
  }

  // when task is clicked set the selected task
  onTaskClicked(task) {
    this.setState({
      selectedTask: task,
    });
  }

  // search based on search parameters
  search(searchParam) {
    this.setState({
      queryParam: searchParam,
      searchFlag: true,
      page: 0,
      tasklist: [],
      selectedTask: null,
    });
  }

  // collapse the tasklist
  // collapseLeftSection() {
  //   if (!this.state.changeLeftGridFlag) {
  //     this.setState({
  //       leftGridValues: [1, 1, 1],
  //       rightGridValues: [11, 12, 12],
  //       changeLeftGridFlag: !this.state.changeLeftGridFlag,
  //     })
  //   } else {
  //     this.setState({
  //       leftGridValues: [2, 3, 12],
  //       rightGridValues: [10, 9, 12],
  //       changeLeftGridFlag: !this.state.changeLeftGridFlag,
  //     })
  //   }
  // }

  // getChevronicon() {
  //   if (this.state.changeLeftGridFlag) {
  //     return (
  //       <ChevronRight onClick={this.collapseLeftSection} />
  //     )
  //   } else {
  //     return (
  //       <ChevronLeft onClick={this.collapseLeftSection} />
  //     )
  //   }
  // }

  // refresh task list
  refreshTasks(flag = false) {
    this.setState({
      refreshTasks: true,
      tasklist: [],
      page: 0,
      taskCompletedFlag: flag,
    });
  }

  // on load more tasks
  loadMoreTasks(page) {
    let rem = this.state.totalTasks / TASKS_PER_PAGE;
    let count = Math.round(this.state.totalTasks / TASKS_PER_PAGE);
    let paginationC = rem > 0 ? count + 1 : count;
    if (page <= paginationC) {
      this.setState({
        page: page,
      });
    }
  }

  // FOR SORTING

  refreshTasksOnSorting(list) {
    this.setState({
      selectedSortingOptions: list,
      tasklist: [],
      page: 0,
      loading: true,
    });
  }

  render() {
    return (
      <div style={{ position: "relative" }}>
        {this.state.loading && <Loader position="relative" />}
        <Grid container spacing={1}>
          <Grid
            item
            lg={this.state.leftGridValues[0]}
            md={this.state.leftGridValues[1]}
            xs={this.state.leftGridValues[2]}
            spacing={0}
            className="tasklist-grid"
          >
            <Box style={{ backgroundColor: "#fff" }}>
              {/* <div className='collapse-icon'>
                {this.getChevronicon()}
              </div> */}
              <div
                className={this.state.changeLeftGridFlag ? "hide" : ""}
                id="top-setting"
              >
                <Search onSearchClicked={(param) => this.search(param)} />
                <div className="layout-heading">
                  <div>
                    <Typography
                      color="secondaryText"
                      gutterBottom
                      variant="h5"
                      id="title"
                    >
                      {this.props.title} ({this.state.totalTasks})
                    </Typography>
                  </div>
                </div>

                {/* sorting */}
                <Sorting
                  state={this.state.state}
                  refreshTasksOnSorting={(params) =>
                    this.refreshTasksOnSorting(params)
                  }
                />
              </div>
              <div style={{ position: "relative" }}>
                <TaskList
                  tasklist={this.state.tasklist}
                  className={this.state.changeLeftGridFlag ? "hide" : ""}
                  onTaskClicked={this.onTaskClicked}
                  refresh={
                    this.state.queryParam || this.state.taskCompletedFlag
                      ? true
                      : false
                  }
                  loadMore={this.loadMoreTasks}
                  count={{
                    total: this.state.totalTasks,
                    page: this.state.page,
                  }}
                />
                <div
                  className={
                    "tasklist-overlay" +
                    " " +
                    (this.state.changeLeftGridFlag ? "" : "hide")
                  }
                ></div>
              </div>
            </Box>
          </Grid>
          <Grid
            item
            lg={this.state.rightGridValues[0]}
            md={this.state.rightGridValues[1]}
            xs={this.state.rightGridValues[2]}
            spacing={0}
            className="tasklist-grid"
          >
            <Box id="container">
              {/* {this.state.selectedTask &&  <CaseDetails selectedTask={this.state.selectedTask} onTaskComplet={() => this.refreshTasks()} />} */}
              {this.state.selectedTask && (
                <CaseDetails
                  selectedTask={this.state.selectedTask}
                  onTaskComplet={() => this.refreshTasks(true)}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </div>
    );
  }
}
