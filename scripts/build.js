const { exec } = require(".");
process.env.NODE_ENV = "production";

console.log("Starting production.....");

exec("echo", ["implement build script here"]);
