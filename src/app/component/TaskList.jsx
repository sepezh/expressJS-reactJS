import React from "react";
import { connect } from "react-redux";

export const TaskList = ({ tasks, name }) => (
  <div>
    <h5>{name}</h5>
    <h6>
      {tasks.map(task => (
        <div>{task.name}</div>
      ))}
    </h6>
  </div>
);

function mapStateToProps(state, ownProps) {
  let groupID = ownProps.id;
  return {
    name: ownProps.name,
    id: groupID,
    tasks: state.tasks.filter(task => task.group === groupID)
  };
}

export const ConnectedTaskList = connect(mapStateToProps)(TaskList);
