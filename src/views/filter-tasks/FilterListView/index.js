import React, { Component } from "react";
import { Box, makeStyles, Grid, Button, Typography } from "@material-ui/core";
import Search from "../../filter/search";
import { ChevronLeft, ChevronRight } from "react-feather";
import "../../customer/MyTasksListView/style.css";
import TaskList from "../../../layouts/TaskLayout/TaskList";
import EditIcon from "@material-ui/icons/Edit";
import CreateFilterDailog from "../../../layouts/DashboardLayout/CreateFilterDailog";
import CaseDetails from "../../../layouts/TaskLayout/CaseDetails";
import Loader from "../../../layouts/TaskLayout/loader";
import Sorting from "src/layouts/TaskLayout/Sorting";
import {
  TASKS_PER_PAGE,
  ASCENDING,
  DESCENDING,
} from "src/variables/taskVariables";
import {
  getFilterTasksCount,
  getCaseDefinition,
  getCaseVariables,
  getFilterTasks,
  getFilter,
} from "src/services/camundaService";
import Basename from "src/Basename";

class FilterListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      filterDetails: null,
      filterOpen: false,
      editId: "",
      loading: false,
      selectedSortingOptions: [],
      taskCompletedFlag: false,
    };

    this.onTaskClicked = this.onTaskClicked.bind(this);
    this.loadMoreTasks = this.loadMoreTasks.bind(this);
    // this.collapseLeftSection = this.collapseLeftSection.bind(this);
    this.getTasksCount = this.getTasksCount.bind(this);
    this.getFilterDetails = this.getFilterDetails.bind(this);
  }
  componentDidMount() {
    this.setState({
      loading: true,
    });
    const { filterId } = this.props;
    this.setState({
      filterId: filterId,
    });
    // this.getTasksCount();
    // this.getTasks(filterId);
    // this.getFilterDetails();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchFlag) {
      this.getTasksCount();
      this.getTasks();
      this.state.searchFlag = !this.state.searchFlag;
    }
    if (this.props.filterId && prevProps.filterId != this.props.filterId) {
      this.refreshTasks(true);
      this.getTasksCount();
      this.getTasks();
      this.getFilterDetails();
      this.setState({ taskCompletedFlag: true });
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
      this.getFilterDetails();
    }
    if (prevState.page != this.state.page) {
      this.getTasks();
    }

    if (this.state.refreshTasks) {
      this.getTasksCount();
      this.getTasks();
      this.state.refreshTasks = false;
    }

    if (this.state.taskCompletedFlag) {
      this.setState({ taskCompletedFlag: false });
    }
  }

  getFilterDetails() {
    getFilter(this.props.filterId).then((response) => {
      if (response.success) {
        this.setState({
          filterDetails: response.data,
        });
      }
      if (!response.success) {
        this.setState({
          loading: false,
        });
      }
    });
    // fetch(`${process.env.REACT_APP_SERVER_URL}/filter/${this.props.filterId}`, {
    //   "method": "GET",
    //   "headers": {
    //     "Authorization": "Bearer " + localStorage.getItem('react-token'),
    //   }
    // })
    //   .then(presponse => presponse.json())
    //   .then(presponse => {
    //     this.setState({
    //       filterDetails: presponse,
    //     })
    //   })
    //   .catch(err => {
    //     this.setState({
    //       loading: false
    //     })
    //     console.log(err);
    //   });
  }

  getTaskRequestBody(count = false) {
    let query = {};
    query["sorting"] = [];
    //set sorting param

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

    // get the results for pagination
    // if (!count) {
    //   query['firstResult'] = (this.state.page * TASKS_PER_PAGE);
    //   query['maxResults'] = TASKS_PER_PAGE;;
    // }

    if (this.state.queryParam) {
      if (this.state.queryParam.category) {
        query[this.state.queryParam.category] = [];
        let caseVariable = {
          name: this.state.queryParam.id,
          operator: "eq",
          value: this.state.queryParam.value,
        };
        query[this.state.queryParam.category].push(caseVariable);
      } else {
        query[this.state.queryParam.id] = this.state.queryParam.value;
      }
    }
    return query;
  }

  getTasksCount() {
    const requestBody = this.getTaskRequestBody(true);
    getFilterTasksCount(this.props.filterId, requestBody).then((response) => {
      if (response.success) {
        console.log(response);
        this.setState({
          totalTasks: response.data.data.count,
        });
      }
      // if(!response.success) {

      // }
    });

    // fetch(`${process.env.REACT_APP_SERVER_URL}/filter/${this.props.filterId}/count`, {
    //   "method": "POST",
    //   "headers": {
    //     "Authorization": "Bearer " + localStorage.getItem('react-token'),
    //     "content-type": "application/json",
    //     "accept": "application/json"
    //   },
    //   "body": JSON.stringify(requestBody)
    // })
    //   .then(response => response.json())
    //   .then(response => {
    //     this.setState({
    //       totalTasks: response.count
    //     })

    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }

  getTasks() {
    const requestBody = this.getTaskRequestBody();
    const queryParam =
      "&firstResult=" +
      this.state.page * TASKS_PER_PAGE +
      "&maxResults=" +
      TASKS_PER_PAGE;
    getFilterTasks(this.props.filterId, requestBody, queryParam).then(
      (response) => {
        if (response.success) {
          let taskList = response.data;
          let index = 0;
          if (taskList.length > 0) {
            taskList.forEach((task) => {
              if (task.caseDefinitionId) {
                getCaseDefinition(task.caseDefinitionId).then((presponse) => {
                  if (presponse.success) {
                    task["processName"] = presponse.data.name
                      ? presponse.data.name
                      : presponse.data.key;
                    task["caseKey"] = presponse.data.key;
                    index = index + 1;
                    if (index == taskList.length) {
                      this.getTaskVariable(taskList);
                    }
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
            });
            this.setTaskList(taskList);
          }
        }
      }
    );
    // fetch(`${process.env.REACT_APP_SERVER_URL}/filter/${this.props.filterId}/list?${queryParam}`, {
    //   "method": "POST",
    //   "headers": {
    //     "content-type": "application/json",
    //     "Authorization": "Bearer " + localStorage.getItem('react-token'),
    //     "accept": "application/json"
    //   },
    //   "body": JSON.stringify(requestBody)
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
    //               this.setState({
    //                 loading: false
    //               })
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
    //         loading: false
    //       })
    //       this.setTaskList(taskList);
    //     }

    //   })
    //   .catch(err => {
    //     this.setState({
    //       loading: false
    //     })
    //     console.log(err);
    //   });
  }

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

  getTaskVariable(taskList) {
    let index = 0;
    taskList.forEach((task) => {
      if (task.caseInstanceId) {
        getCaseVariables(task.caseInstanceId).then((response) => {
          if (response.success) {
            task["variables"] = response.data;
            index = index + 1;
            if (index == taskList.length) {
              this.setState({
                loading: false,
              });
              this.setTaskList(taskList);
            }
          }
          if (!response.success) {
            this.setState({
              loading: false,
            });
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
        //       this.setState({
        //         loading: false
        //       })
        //       this.setTaskList(taskList);
        //     }
        //   })
        //   .catch(err => {
        //     this.setState({
        //       loading: false
        //     })
        //     console.log(err);
        //   });
      } else {
        index = index + 1;
        if (index == taskList.length) {
          this.setState({
            loading: false,
          });
          this.setTaskList(taskList);
        }
      }
    });
  }

  onTaskClicked(task) {
    this.setState({
      selectedTask: task,
    });
  }

  search(searchParam) {
    this.setState({
      queryParam: searchParam,
      searchFlag: true,
      page: 0,
      tasklist: [],
      selectedTask: null,
    });
  }

  refreshTasks(flag = false) {
    this.setState({
      refreshTasks: true,
      tasklist: [],
      page: 0,
      loading: true,
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

  // edit filter
  handleOpen() {
    this.setState({
      filterOpen: true,
      editId: this.props.filterId,
    });
  }

  onFilterSaved(option) {
    let url = "";
    if (option == "delete") {
      url = Basename(window.location.href) + "/app/my-tasks";
      this.props.onFilterSaved(url);
    }
    if (option == "update") {
      this.setState({
        loading: true,
      });
      this.getFilterDetails();
      this.getTasksCount();
      this.getTasks();
    }
  }

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
        {this.state.loading && <Loader />}
        <Grid container spacing={1}>
          <Grid
            item
            lg={this.state.leftGridValues[0]}
            md={this.state.leftGridValues[1]}
            xs={this.state.leftGridValues[2]}
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
                      style={{ display: "flex", marginTop: "3px" }}
                    >
                      <span>
                        {this.state.filterDetails
                          ? this.state.filterDetails.name
                          : "Filter"}{" "}
                        ({this.state.totalTasks})
                      </span>
                      {this.state.filterId && (
                        <span>
                          <EditIcon
                            onClick={() => this.handleOpen()}
                            fontSize="small"
                          />
                        </span>
                      )}
                    </Typography>
                  </div>
                </div>

                <Sorting
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
            className="tasklist-grid"
          >
            <Box id="container">
              {this.state.selectedTask && (
                <CaseDetails
                  selectedTask={this.state.selectedTask}
                  onTaskComplet={() => this.refreshTasks(true)}
                />
              )}
            </Box>
          </Grid>
        </Grid>
        <div>
          <CreateFilterDailog
            isOpen={this.state.filterOpen}
            isEdit={this.props.filterId}
            openStatus={() => this.setState({ filterOpen: false })}
            onFilterSaved={(option) => this.onFilterSaved(option)}
          />
        </div>
      </div>
    );
  }
}

export default FilterListView;
