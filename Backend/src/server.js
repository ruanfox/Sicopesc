require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

const express = require("express");
const cors = require("cors");
const UserController = require("./controllers/UserController");

class ServerController {
  constructor() {
    this.express = express();

    this.middlewares();
    this.registerRoutes();

    this.executeServer();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
  }

  registerRoutes() {
    this.express.use(UserController(this.express).createPublicRoutes());
    require("./routes")(this.express);
  }

  executeServer() {
    const port = process.env.PORT || 4000;
    this.express.listen(port);
    console.log(`Server running on port ${port}`);
  }
}

new ServerController();
