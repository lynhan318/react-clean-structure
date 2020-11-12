import React from "react";
import { Switch, Route } from "react-router-dom";

import routes from "./pages/routes";

console.log("routes", routes);

function App() {
  return (
    <React.Suspense fallback={<div>Loading</div>}>
      <Switch>
        {routes.map(({ component: Component, path, ...rest }) => {
          return (
            <Route component={Component} path={path} key={path} {...rest} />
          );
        })}
      </Switch>
    </React.Suspense>
  );
}

export default App;
