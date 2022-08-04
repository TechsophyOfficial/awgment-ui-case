import React, { Component } from 'react';
import "./style.css";
import TaskLayout from '../../../layouts/TaskLayout';
import { ASSIGNEE } from 'src/variables/taskVariables';

export default class MyTasksListView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TaskLayout assignment={ASSIGNEE} title={'My Tasks'}></TaskLayout>
    );
  }
};

