import React from "react";
import { connect } from "react-redux";
import { requestTaskCreation } from "../store/mutations";
import { ConnectedTaskListItem } from "./TaskListItem";

export const TaskList = ({ tasks, name, id, createNewTask }) => (
  <div className="card p-2 m-2">
    <h3>{name}</h3>
    <div>
      {tasks.map((task) => (
        <ConnectedTaskListItem {...task} key={task.id} />
      ))}
    </div>
    <div>
      <button
        className="btn btn-primary btn-block mt-2"
        onClick={() => createNewTask(id)}
        type="button"
      >
        Add New
      </button>
    </div>
  </div>
);

function mapStateToProps(state, { name, id }) {
  return {
    name: name,
    tasks: state.tasks.filter((task) => task.group === id),
    id,
  };
}

const mapDispatchToProps = (dispatch, { id }) => ({
  createNewTask() {
    dispatch(requestTaskCreation(id));
  },
});

export const ConnectedTaskList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList);
