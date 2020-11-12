import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import createReducer from "./reducers";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();

function createSagaInjector(runSaga, rootSaga) {
  const injectedSagas = new Map();

  const isInjected = (key) => injectedSagas.has(key);

  const injectSaga = (key, saga) => {
    if (isInjected(key)) return;

    const task = runSaga(saga);

    injectedSagas.set(key, task);
  };

  injectSaga("root", rootSaga);

  return injectSaga;
}

const store = createStore(
  createReducer(),
  {},
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.asyncReducers = {};
store.injectReducer = (key, reducer) => {
  store.asyncReducers[key] = reducer;
  store.replaceReducer(createReducer(store.asyncReducers));
  return store;
};

store.injectSaga = createSagaInjector(sagaMiddleware.run, rootSaga);
export default store;
