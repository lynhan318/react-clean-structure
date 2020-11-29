let routes = [];
const context = require.context(".", true, /route.js$/);
context.keys().forEach((path) => {
  routes.push(context(`${path}`).default);
});

export default routes;
