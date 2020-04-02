import React from "react";
import { connect } from "react-redux";
import { requestTaskCreation } from "../store/mutations";
import { Link } from "react-router-dom";

export const TaskList = ({ tasks, name, id, createNewTask }) => (
  <div>
    <h3>{name}</h3>
    <div>
      {tasks.map(task => (
        <Link to={`/task/${task.id}`} key={task.id}>
          <div>{task.name}</div>
        </Link>
      ))}
    </div>
    <button
      className="btn btn-primary btn-block mt-2"
      onClick={() => createNewTask(id)}
      type="button"
    >
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

const mapDispatchToProps = (dispatch, ownProps) => ({
  createNewTask(id) {
    dispatch(requestTaskCreation(id));
  }
});

export const ConnectedTaskList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList);
