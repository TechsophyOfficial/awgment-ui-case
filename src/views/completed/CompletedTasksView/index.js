import React, { Component } from 'react';
import "../../customer/MyTasksListView/style.css";
import TaskLayout from '../../../layouts/TaskLayout';

export default class CompletedTasksView extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TaskLayout state={'completed'} title={'Completed Tasks'}></TaskLayout>
    );
  }
};


