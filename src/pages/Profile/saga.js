import { take, fork, delay, put } from "redux-saga/effects";

function* checkAuth({ type, payload }) {
  try {
    yield delay(3000);
    yield put({
      type: "get_profile::success",
      payload: {
        username: "hihi",
        display_name: "Ly Thanh Nhan",
      },
    });
  } catch (e) {
    console.log("we got error here", e);
  }
}

export default function* () {
  while (true) {
    const action = yield take("get_profile");
    yield fork(checkAuth, action);
  }
}
