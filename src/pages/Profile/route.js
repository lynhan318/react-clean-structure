import { lazy } from "react";
import { initModule } from "#helpers";

export default {
  path: "/profile",
  exact: false,
  component: lazy(async () => {
    await initModule("Feed", "feed");
    await initModule("Profile", "profile");
    return import(".");
  }),
};
