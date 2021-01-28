const find = require("find-process");
const { spawn } = require("child_process");

function terminateProcess(name) {
  find("name", "node", true).then(function (list) {
    list
      .filter((item) => item.cmd === `node ${name}`)
      .forEach((item) => process.kill(item.pid));
  });
}

function launchProcess(name) {
  find("name", "node", true).then(function (list) {
    const workerList = list.filter((item) => item.cmd === `node ${name}`);
    if (!workerList.length) {
      const child = spawn("node", [name], {
        detached: true,
        stdio: "ignore",
      });

      child.unref();
    }
  });
}

module.exports = {
  launchProcess,
  terminateProcess,
};
