import { lazy } from "react";
import { initModule } from "Helpers";

export default {
  path: "/feed",
  exact: false,
  component: lazy(async () => {
    await initModule("Feed", "feed");
    return import(".");
  }),
};
