const { exec } = require(".");

console.log("Starting development.....");
exec("yarn", [
  "webpack",
  "serve",
  "--config",
  "./config/webpack.config.js",
  "--env",
  "NODE_ENV=development",
]);
