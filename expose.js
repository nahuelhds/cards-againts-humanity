const child_process = require("child_process");
const ngrok = require("ngrok");
require("dotenv").config();

(async function () {
  ngrok.authtoken(process.env.NGROK_AUTH_TOKEN);
  const urlClient = await ngrok.connect({
    proto: "http",
    addr: 3000,
    bind_tls: true,
  });

  const urlServer = await ngrok.connect({
    proto: "http",
    addr: 8000,
    bind_tls: true,
  });
  console.log(process.cwd());
  const npmStart = child_process.spawn("env", [
    `REACT_APP_MULTIPLAYER_CLIENT=${urlClient}`,
    `REACT_APP_MULTIPLAYER_SERVER=${urlServer}`,
    "npm",
    "start",
  ]);

  console.log("Server is at:", urlServer);
  npmStart.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  npmStart.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  npmStart.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
})();
