import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {
  Box,
  Card,
  Typography,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Grid,
  useTheme
} from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import "./style.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { ALL_TASKS } from 'src/constants/routes';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const TaskList = ({ className, tasklist, onTaskClicked, refresh, loadMore, count, ...rest }) => {
  const classes = useStyles();
  const config = JSON.parse(sessionStorage.getItem('config'));
  const [tasks, setTasks] = useState(tasklist)
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const taskListRef = useRef();
  const [selectedTask, setSelectedTask] = useState({ id: '' })
  const theme = useTheme();
  const [tasklistHt, setTasklistHt] = useState(0);
  const [reset , setReset] = useState(false)

  useEffect(() => {
    // window.scrollTo(0, 0);v
    if ((tasklist.length > 0) && (selectedTask.id == '')) {
      setSelectedTask(tasklist[0]);
    }
    if(reset && tasklist.length>0) {  
      setSelectedTask(tasklist[0]);
      setReset(false)
    }
    if (tasklist.length <= 0 ) {
      setHasMore(false);
      return;
    } else {
      if (!hasMore) {
        setHasMore(true);
      }
    }
    setPage(count.page)
    setTasks(tasklist)
  }, [tasklist, count, tasks])

  useEffect(() => {
    // window.scrollTo(0, 0)
    loadMore(page)
  }, [page])

  useEffect(() => {
    if(refresh) {
      setReset(true)
    }
  }, [refresh])

  useEffect(() => {
    // window.scrollTo(0, 0);
  }, [])

  // emit an event when task is selected from list
  function onItemClickHandler(event) {
    setSelectedTask(event);
    onTaskClicked(event);
  }
  
  // display task variable in collapsable manner
  function getTaskVariables(variablesObject, caseDefinitionKey) {
    let variables = [];   
    if (config &&
      config.enabled_case_variables &&
      config.enabled_case_variables[caseDefinitionKey] &&
      config.enabled_case_variables[caseDefinitionKey].variables.length > 0) {
      const caseVariables = config.enabled_case_variables[caseDefinitionKey].variables;
      caseVariables.forEach(variable => {
        Object.keys(variablesObject).forEach(function (key) {
          if (variable.name == key) {
            variables.push({ name: key, title: variable.title, value: variablesObject[key].value });
          }
        });
      })
    }

    return (
      variables.length > 0 && <Accordion className='task-variable-section'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        </AccordionSummary>
        <AccordionDetails className="task-variable-details">
          <Grid
            container
            spacing={1}
          >
            {variables.map((variable) =>
              <Grid item lg={6} md={6} xs={12}>
                <Typography color="textPrimary" gutterBottom variant="h6" >
                  #{variable.title}
                </Typography>
                <Typography color="textSecondary" variant="body2" >
                  {variable.value}
                </Typography>
              </Grid>
            )}
          </Grid>
          <div className="variable-overlay"></div>
        </AccordionDetails>
      </Accordion>

    )
  }

  function getTaskPriority(priority) {
    if(priority) {
      if(priority > 0 && priority < 10) {
        return <span style={{color : 'blue'}}>Low</span>
      }
      if(priority > 10 && priority < 51) {
        return <span style={{color : 'orange'}}>Medium</span>
      }
      if(priority > 50 && priority < 100) {
        return <span style={{color : 'red'}}>High</span>
      }
      else {
        return <span>{priority}</span>
      }
    }
  }


  function isAllTaskPage() {
    const current_url = window.location.href
    if(current_url.includes(ALL_TASKS)) {
      return true
    }
    return false
  }

  // list of tasks
  const items = tasklist.map((task, i) =>
    <ListItem button mt={3} key={task.id} onClick={() => onItemClickHandler(task)}
      className={`task-variable-list ${(task.id == selectedTask.id) || (refresh && i==0) ? "active" : ""}`}
      style={{ borderColor: theme.palette.primary.main }}>
      <ListItemText>
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h4"
          style={{display : 'flex'}}
        >
         <span>
            {task.name}
            </span>
        {isAllTaskPage() &&  <span style={{color : '#546e7a', fontWeight : 'normal'}}>
            {task.assignee}
            </span>
        }
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          <span>
            <Moment format="YYYY/MM/DD HH:mm">
              {task.created}
            </Moment>
          </span>
          <span>
            {getTaskPriority(task.priority)}
            </span>
        </Typography>
        <div>
          {task.variables &&
            getTaskVariables(task.variables, task.caseKey)
          }
        </div>
      </ListItemText>
    </ListItem>
  );

  const fetchMoreData = () => {
    if (tasks.length >= count.total) {
      setHasMore(false);
      return;
    }
    setPage(page + 1);
  };


  const setHeight = (el) => {
    if (el.current) {
      const top = el.current.offsetTop;
      const windowHeight = window.innerHeight;
      const windowHeight2 = document.getElementById('container')?.clientHeight;
      const windowHeight3 = document.getElementById('top-setting')?.clientHeight;

      if (windowHeight2 < windowHeight) {
        return (windowHeight - top);
      } else if (windowHeight2 > windowHeight) {
        let height = windowHeight2 - windowHeight3;
         return height           

      }

    } else {
      const windowHeight = window.innerHeight;
      const windowHeight3 = document.getElementById('top-setting')?.clientHeight;
      return (windowHeight - 10);
    }
    return 30;
  }

  return (
    <>
      <div id="tasklist-section" ref={taskListRef}>
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4 style={{ padding: '12px' }}>Loading...</h4>}
          height={setHeight(taskListRef)}
          // height={'auto'}
          endMessage={
            (count.total > 0) && <h4 id="total-tasks" style={{ padding: '3px' }}>
              Total Tasks {count.total}
            </h4>
          }
        >
          <Card
            className={clsx(classes.root, className)}
            {...rest}
          >
            <List>
              {items}
            </List>
          </Card>
        </InfiniteScroll>
      </div>
    </>

  );
};

TaskList.propTypes = {
  className: PropTypes.string,
  tasklist: PropTypes.array.isRequired
};

export default TaskList;
