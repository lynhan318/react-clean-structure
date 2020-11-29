import { lazy } from "react";
import { initModule } from "Helpers";

export default {
  path: "/",
  exact: true,
  component: lazy(async () => {
    await initModule("Home", "home");
    return import(".");
  }),
};
