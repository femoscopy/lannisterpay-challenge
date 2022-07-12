"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _app = _interopRequireDefault(require("./app"));

var _http = _interopRequireDefault(require("http"));

var _debug = _interopRequireDefault(require("debug"));

var _keys = require("./config/keys");

var log = (0, _debug["default"])("log");

var startServer = function startServer() {
  var server = _http["default"].createServer(_app["default"]);

  var normalizePort = function normalizePort(val) {
    var port = parseInt(val, 10);

    if (Number.isNaN(port)) {
      return val;
    }

    if (port >= 0) {
      return port;
    }

    return false;
  };

  var port = normalizePort(_keys.PORT);

  _app["default"].set("port", port);

  var errorHandler = function errorHandler(error) {
    if (error.syscall !== "listen") {
      throw error;
    }

    var address = server.address();
    var bind = typeof address === "string" ? "pipe ".concat(address) : "port: ".concat(port);

    switch (error.code) {
      case "EACCES":
        log("".concat(bind, " requires elevated privileges."));
        process.exit(1);
        break;

      case "EADDRINUSE":
        log("".concat(bind, " is already in use."));
        process.exit(1);
        break;

      default:
        throw error;
    }
  };

  server.on("error", errorHandler);
  server.on("listening", function () {
    var address = server.address();
    var bind = typeof address === "string" ? "pipe ".concat(address) : "port ".concat(port);
    log("Listening on ".concat(bind));
  });
  server.listen(port, function () {
    console.log("Express server started listening on port", port);
  }); // If the Node process ends, handle graceful shutdown

  var sigs = ["SIGINT", "SIGTERM", "SIGQUIT"];
  sigs.forEach(function (sig) {
    process.on(sig, function () {
      console.log("Closing http server..."); // Stops the server from accepting new connections and finish existing connections.

      server.close(function (err) {
        console.log("Http server closed!");

        if (err) {
          console.error(err);
          process.exit(1);
        }

        process.exit(0);
      });
    });
  });
};

try {
  startServer();
} catch (error) {
  log(error.message);
  process.exit(-1);
}