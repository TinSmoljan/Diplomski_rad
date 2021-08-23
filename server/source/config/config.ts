const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

//default exports such as server name server port and so on

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME;
const SERVER_PORT = process.env.SERVER_PORT;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};

const config = {
  server: SERVER,
};

export default config;
