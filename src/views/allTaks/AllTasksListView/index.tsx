import React, { Component } from 'react';
import "../../customer/MyTasksListView/style.css";
import TaskLayout from '../../../layouts/TaskLayout';

export default class AllTasksView extends Component {

  render() {
    return (
      <TaskLayout title={'All Tasks'}></TaskLayout>
    );
  }
};

