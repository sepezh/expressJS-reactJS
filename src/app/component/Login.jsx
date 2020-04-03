import React from "react";
import * as mutations from "../store/mutations";
import { connect } from "react-redux";

const LoginComponent = ({ authenticateUser, authenticated }) => {
  return (
    <div>
      <h2>Please login</h2>
      <form onSubmit={authenticateUser}>
        <input
          type="text"
          name="username"
          placeholder="username"
          defaultValue="Dev"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          defaultValue=""
        />
        {authenticated === mutations.NOT_AUTHENTICATED ? (
          <p> Login incorrect </p>
        ) : null}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ session }) => ({
  authenticated: session.authenticated
});

const mapDispatchToProps = dispatch => ({
  authenticateUser(event) {
    event.preventDefault();
    let username = event.target[`username`].value;
    let password = event.target[`password`].value;
    dispatch(mutations.requestAuthenticateUser(username, password));
  }
});

export const ConnectedLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
