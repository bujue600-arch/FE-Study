const { exec } = require("child_process");
const util = require("util");

const execPromise = util.promisify(exec);

execPromise("node -v")
  .then((res) => {
    console.log(res, "res");
  })
  .catch((err) => {
    console.log(err, "err");
  });
