import React, { Component } from 'react';
import "../../customer/MyTasksListView/style.css";
import TaskLayout from '../../../layouts/TaskLayout';
import { CANDIDATE } from 'src/variables/taskVariables';

export default class GroupTasksView extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TaskLayout assignment={CANDIDATE} title={'Group Tasks'}></TaskLayout>
    );
  }
};

