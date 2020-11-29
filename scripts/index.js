const { spawn } = require("child_process");

function exec(cmd, args) {
  const ps = spawn(cmd, args);

  ps.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  ps.stderr.on("data", (data) => {
    console.error(data.toString());
  });

  ps.on("close", () => {
    console.log(`Finish process ✨✨✨`);
  });
}
module.exports = {
  exec,
};
