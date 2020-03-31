import React from "react";
import { connect } from "react-redux";
import { requestTaskCreation } from "../store/mutations";

export const TaskList = ({ tasks, name, id, createNewTask }) => (
  <div>
    <h5>{name}</h5>
    <h6>
      {tasks.map(task => (
        <div key={task.id}>{task.name}</div>
      ))}
    </h6>
    <button onClick={() => createNewTask(id)} type="button">
      Add New
    </button>
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

function mapDispatchToProps(dispatch, ownProps) {
  return {
    createNewTask(id) {
      console.log("Creating new task ...", id);
      dispatch(requestTaskCreation(id));
    }
  };
}

export const ConnectedTaskList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList);
