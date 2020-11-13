import { lazy } from "react";
import { initModule } from "#helpers";

export default {
  path: "/feed",
  exact: false,
  component: lazy(async () => {
    await initModule("Feed", "feed");
    return import(".");
  }),
};
