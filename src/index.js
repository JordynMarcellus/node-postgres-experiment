const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const routes = require("./router/router");

require("dotenv").config({
  path: path.resolve(process.cwd(), "development.server.env"),
});

const server = express();
const port = process.env.NODE_APP_PORT || 3000;

server.use(bodyParser.json());
server.use(cors());
server.use(helmet());
server.use(routes);

server.listen(port, () => console.log(`listening on ${port}!!!`));
