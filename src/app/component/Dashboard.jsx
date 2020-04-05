import React from "react";
import { connect } from "react-redux";
import { ConnectedTaskList } from "./TaskList";

export const Dashboard = ({ groups }) => (
  <div className="row">
    {groups.map((group) => (
      <ConnectedTaskList key={group.id} {...group} className="col" />
    ))}
  </div>
);

const mapStateToProps = ({ groups }) => ({ groups });

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);
