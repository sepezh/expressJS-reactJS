import React from "react";
import * as mutations from "../store/mutations";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const LoginComponent = ({ authenticateUser, authenticated }) => {
  return (
    <div className="card p-3 col-6">
      <h2>Please login</h2>
      <h3>
        <Link to="signup">Don't have an account? Sign up.</Link>
      </h3>
      <form onSubmit={authenticateUser}>
        <input
          type="text"
          name="username"
          placeholder="username"
          defaultValue="Dev"
          className="form-control"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          defaultValue="TUPLES"
          className="form-control mt-2"
        />
        {authenticated === mutations.NOT_AUTHENTICATED ? (
          <p> Login incorrect </p>
        ) : null}
        <button
          type="submit"
          disabled={authenticated === `PROCESSING`}
          className="form-control mt-2 btn btn-primary"
        >
          Login
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ session }) => ({
  authenticated: session.authenticated,
});

const mapDispatchToProps = (dispatch) => ({
  authenticateUser(event) {
    event.preventDefault();
    let username = event.target[`username`].value;
    let password = event.target[`password`].value;
    dispatch(mutations.requestAuthenticateUser(username, password));
  },
});

export const ConnectedLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
