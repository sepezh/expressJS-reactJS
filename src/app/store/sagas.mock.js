import { take, put, select } from "redux-saga/effects";
import * as mutations from "./mutations";
import * as uuid from "uuid";
import { delay } from "redux-saga";
// import {} from "react-router";
import { history } from "./history";

export function* taskCreationSaga() {
  while (true) {
    const { groupID } = yield take(mutations.REQUEST_TASK_CREATION);
    const ownerID = yield select((state) => state.session.id);
    const taskID = uuid();
    yield put(mutations.createTask(taskID, groupID, ownerID));
  }
}

export function* userAuthenticationSaga() {
  while (true) {
    const { username, password } = yield take(
      mutations.REQUEST_AUTHENTICATE_USER
    );
    yield delay(250);
    yield put(
      mutations.processAuthenticateUser(mutations.AUTHENTICATED, {
        id: "U1",
        token: "ABCD-1234",
      })
    );

    history.push(`/dashboard`);
  }
}
