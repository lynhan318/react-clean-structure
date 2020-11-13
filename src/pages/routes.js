import { lazy } from "react";
import store from "#redux";

const initModule = async (path, module) => {
  const [reducer, saga] = await Promise.all([
    import(`./${path}/reducer`),
    import(`./${path}/saga`),
  ]);
  store.injectReducer(module, reducer.default);
  store.injectSaga(module, saga.default);
  return "ok";
};

export default [
  {
    path: "/feed",
    exact: false,
    component: lazy(async () => {
      await initModule("Feed", "feed");
      await initModule("Profile", "profile");
      return import("./Feed");
    }),
  },
  {
    path: "/",
    exact: true,
    component: lazy(async () => {
      await initModule("Home", "home");
      return import("./Home");
    }),
  },
  {
    path: "/profile",
    exact: true,
    component: lazy(async () => {
      await initModule("Profile", "profile");
      return import("./Profile");
    }),
  },
];
