import React, { useRef, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import StyleIcon from "@material-ui/icons/Style";
import "./style.css";
import { Grid, Icon, MenuItem, Menu } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Moment from "react-moment";
import Loader from "./loader";
import { TXN_STATE_VARIABLE } from "../../variables/chatWidget";
import { createComment } from "src/services/camundaService";
import { getCommentsList } from "src/services/customService";
import AppConfig from "src/appConfig";

const columns = [
  // { id: 'state', label: 'State', minWidth: 170 },
  {
    id: "comment",
    label: "Comment",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  { id: "createdBy", label: "Created By", minWidth: 100 },
  {
    id: "createdOn",
    label: "Created On",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(state, createdBy, createdOn, comment) {
  return { state, createdBy, createdOn, comment };
}

const useStyles = makeStyles({
  commentsBlock: {
    "& .activiti-option": {
      float: "right",
    },
  },
  root: {
    width: "100%",
    backgroundColor: "transparent",
    marginLeft: "5%",
    boxShadow: "none",

    "& .MuiTableRow-root": {
      display: "flex",
    },

    "& .MuiTableCell-root": {
      flex: "1",
      border: "none",
      textAlign: "left",
    },

    "& .MuiTableCell-stickyHeader": {
      fontSize: 12,
      fontWeight: 400,
      color: "#8A8A8A",
      border: "none",
      backgroundColor: "transparent",
    },
    "& .MuiTableCell-stickyHeader:nth-child(4)": {
      flex: 2,
    },
    "& .MuiTableBody-root .MuiTableRow-root": {
      backgroundColor: "#fff",
      borderRadius: "9px",
      minHeight: 79,
      marginBottom: 10,
      display: "flex",
      alignItems: "center",
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
    },
    "& .MuiTableBody-root .MuiTableCell-body": {
      fontSize: "14px",
      fontWeight: 500,
      color: "#000",
    },
    "& .MuiTableBody-root .MuiTableCell-body:nth-child(4)": {
      flex: 2,
    },
  },
  container: {
    maxHeight: "80vh",
  },
});

export default function Comments({ selectedTask, businessKey }) {
  const classes:any = useStyles();
  const page = 0;
  const rowsPerPage = 10;
  const [openCommentBox, setOpenCommentBox] = React.useState(null);
  const [commentList, setCommentList] = React.useState([]);
  const inputRef:any = useRef(null);
  const [loading, setLoading] = React.useState(false);
  // const [businessK , setBusinessKey] = React.useState(businessK)
  const appData:any = React.useContext(AppConfig);

  useEffect(() => {
    if (selectedTask) {
      getComments(businessKey);
    }
  }, []);

  useEffect(() => {
    if (businessKey) {
      getComments(businessKey);
    }
  }, [businessKey]);

  function getComments(businessKey) {
    setLoading(true);
    // getCommentsList()
    if (businessKey) {
      const BASE_URL = `${appData.apiGatewayUrl}`
      getCommentsList(BASE_URL, businessKey).then((response) => {
        if (response.success) {
          if (response && response.data && response.data.data.length > 0) {
            let rows:any = [];
            response.data.data.forEach((comment) => {
              rows.push(
                createData(
                  getCommentState(comment.message),
                  comment.userId,
                  <Moment format="YYYY/MM/DD HH:mm">{comment.time}</Moment>,
                  getMessage(comment.message)
                )
              );
            });
            setCommentList(rows);
          } else {
            setCommentList([]);
          }
          setLoading(false);
        }
        if (!response.success) {
          setLoading(false);
        }
      });
    } else {
      setLoading(false);
    }

    // fetch(`${process.env.REACT_APP_SERVER_URL}/task/${selectedTask.id}/comment`,
    //     {
    //         "method": "GET",
    //         "headers": {
    //             "Authorization": "Bearer " + localStorage.getItem('react-token')
    //         }
    //     })
    //     .then(response => response.json())
    //     .then(response => {
    //         if (response && response.length > 0) {
    //             let rows = [];
    //             response.forEach(comment => {
    //                 rows.push(createData( getCommentState(comment.message), comment.userId, <Moment format="YYYY/MM/DD HH:mm">{comment.time}</Moment>, getMessage(comment.message)))
    //             });
    //             setCommentList(rows);
    //         } else {
    //             setCommentList([]);
    //         }
    //         setLoading(false);
    //     })
    //     .catch(err => {
    //         setLoading(false);
    //         console.log(err);
    //     });
  }

  // const handleChangePage = (event, newPage) => {
  //     setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //     setRowsPerPage(+event.target.value);
  //     setPage(0);
  // };

  function onTextInputChange(e) {
    // setMessage(e.target.value)
  }

  const handleOpenComments = (e) => {
    setOpenCommentBox(e.currentTarget);
    inputRef.current.focus();
  };

  const getCommentState = (message) => {
    let state = "";
    if (message) {
      state = message.split("|")[1];
    }
    return state;
  };

  const getMessage = (message) => {
    let msg = "";
    if (message) {
      msg = message.split("|")[0];
    }
    return msg;
  };
  const getState = () => {
    let state = "";
    if (selectedTask && selectedTask.variables) {
      Object.keys(selectedTask.variables).forEach(function (key) {
        if (key == TXN_STATE_VARIABLE) {
          state = selectedTask.variables[key].value;
        }
      });
    }
    return state;
  };

  function handleAddComment(e) {
    setLoading(true);
    let commentData = inputRef.current.value;
    let state = getState();
    commentData = state ? commentData + "|" + `${state}` : commentData;
    if (commentData) {
      const GATEWAY_URL = `${appData.apiGatewayUrl}`
      createComment(selectedTask.id, {
        taskId: selectedTask.id,
        processInstanceId: selectedTask.processInstanceId,
        comment: commentData,
      }, GATEWAY_URL).then((response) => {
        if (response.success) {
          getComments(businessKey);
          setOpenCommentBox(null);
          inputRef.current.value = "";
        }
        if (!response.success) {
          setLoading(false);
        }
      });
      // fetch(`${process.env.REACT_APP_SERVER_URL}/task/${selectedTask.id}/comment/create`,
      //     {
      //         "method": "POST",
      //         "headers": {
      //             "content-type": "application/json",
      //             "accept": "application/json",
      //             "Authorization": "Bearer " + localStorage.getItem('react-token'),
      //         },
      //         "body": JSON.stringify({
      //             "message": comment
      //         })
      //     })
      //     .then(response => response.json())
      //     .then(response => {
      //         getComments();
      //         setOpenCommentBox(null);
      //         inputRef.current.value = '';
      //     })
      //     .catch(err => {
      //         setLoading(false);
      //         console.log(err);
      //     });
    } else {
      setLoading(false);
    }
  }

  return (
    <div className={classes.commentsBlock}>
      <Grid container>
        <Grid item lg={12} md={12} sm={12} className={""}>
          <AppBar
            position="relative"
            color="transparent"
            // only elevation or outlined allowe
            // variant="dense"
            variant="elevation"
            className={"buyer-head"}
          >
            <Toolbar>
              <Grid container spacing={0}>
                <Grid item lg={6} md={6} xs={12}>
                  <Typography variant="h5">
                    {/* {(configJson && configJson.headings) ? configJson.headings.comments.main : ''} */}
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <div
                    className="activiti-option"
                    id="add-comment-button"
                    onClick={handleOpenComments}
                  >
                    <StyleIcon color="primary" fontSize="inherit" />
                    <Typography color="primary" variant="caption">
                      Add Comment
                    </Typography>
                  </div>

                  <Menu
                    id="simple-menu"
                    anchorEl={openCommentBox}
                    keepMounted
                    open={Boolean(openCommentBox)}
                    onClose={() => setOpenCommentBox(null)}
                    className={"delete-menu comment-menu"}
                  >
                    <MenuItem key={"comment"} button className={"comment-row"}>
                      <div style={{ flexDirection: "column" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Icon>person</Icon>
                          <Typography variant="h4" color="textSecondary">
                            Add Comment
                          </Typography>
                        </div>
                        <div>
                          <form>
                            <textarea
                              // type="text"
                              className=""
                              name="message"
                              ref={inputRef}
                              placeholder={"Enter the message"}
                              autoComplete="off"
                              onChange={onTextInputChange}
                            />
                            <div style={{ display: "flex" }}>
                              <div
                                className="activiti-option"
                                id="add-comment"
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                onClick={handleAddComment}
                              >
                                <Typography color="primary" variant="caption">
                                  Add
                                </Typography>
                              </div>
                              <div
                                className="activiti-option"
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                onClick={() => setOpenCommentBox(null)}
                              >
                                <Typography color="error" variant="caption">
                                  Cancel
                                </Typography>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </MenuItem>
                  </Menu>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>

          <div style={{ position: "relative" }}>
            {loading && <Loader position={"absolute"} />}
            <Paper className={classes.root + " comments-table"} elevation={0}>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column:any) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {commentList
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row:any) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.code}
                          >
                            {columns.map((column:any) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            /> */}
            </Paper>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
