import { lazy } from "react";
import { initModule } from "#helpers";

export default {
  path: "/",
  exact: true,
  component: lazy(async () => {
    await initModule("Home", "home");
    return import(".");
  }),
};
