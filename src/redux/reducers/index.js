import { combineReducers } from "redux";

import user from "./user";
import config from "./config";

export default (asyncReducers = {}) =>
  combineReducers({
    user,
    config,
    ...asyncReducers,
  });
