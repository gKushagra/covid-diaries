// Get the port from the config.js which get PORT from env
const { port } = require("./config");
const http = require("http");
const app = require("./app");

const server = http.createServer(app);

server.listen(port);
