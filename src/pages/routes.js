import { lazy } from "react";
import store from "#redux";

export default [
  {
    path: "/",
    exact: true,
    component: lazy(async () => {
      const [reducer, saga] = await Promise.all([
        import("./Home/reducer"),
        import("./Home/saga"),
      ]);
      store.injectReducer("home", reducer.default);
      store.injectSaga("home", saga.default);
      return import("./Home");
    }),
  },
  {
    path: "/feed",
    exact: false,
    component: lazy(async () => {
      const [reducer, saga] = await Promise.all([
        import("./Feed/reducer"),
        import("./Feed/saga"),
      ]);
      store.injectReducer("feed", reducer.default);
      store.injectSaga("feed", saga.default);
      return import("./Feed");
    }),
  },
  {
    path: "/profile",
    exact: true,
    component: lazy(async () => {
      const [reducer, saga] = await Promise.all([
        import("./Profile/reducer"),
        import("./Profile/saga"),
      ]);
      store.injectReducer("profile", reducer.default);
      store.injectSaga("profile", saga.default);
      return import("./Profile");
    }),
  },
];
