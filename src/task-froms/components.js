import React from "react";
import TaskForm from "./task-form/index.js";
import TxnDetails from "src/views/case/txn-summary/txnDetails.js";
import TxnState from "src/views/case/txn-summary/txnState.js";

const Components = {
  TaskForm: TaskForm,
  TxnDetails : TxnDetails,
  TxnState : TxnState
};

export default block => {
  if (typeof Components[block.component] !== "undefined" && block.type == 'txn') {
    return React.createElement(Components[block.component], {
      selectedTask: block.selectedTask ,
      config : block.config
    });
  }

  else if (typeof Components[block.component] !== "undefined") {
    return React.createElement(Components[block.component], {
      taskId: block.taskId
    });
  }
  return React.createElement( 
    () => <div>The component {block.component} has not been created yet.</div>,
    { key: block.taskId }
  );
};
