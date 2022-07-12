import app from "./app";
import http from "http";
import debug from "debug";
import { PORT } from "./config/keys";

const log = debug("log");

const startServer = () => {
  const server = http.createServer(app);

  const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (Number.isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }

    return false;
  };

  const port = normalizePort(PORT);
  app.set("port", port);

  const errorHandler = (error) => {
    if (error.syscall !== "listen") {
      throw error;
    }
    const address = server.address();
    const bind =
      typeof address === "string" ? `pipe ${address}` : `port: ${port}`;
    switch (error.code) {
      case "EACCES":
        log(`${bind} requires elevated privileges.`);
        process.exit(1);
        break;
      case "EADDRINUSE":
        log(`${bind} is already in use.`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  };

  server.on("error", errorHandler);
  server.on("listening", () => {
    const address = server.address();
    const bind =
      typeof address === "string" ? `pipe ${address}` : `port ${port}`;
    log(`Listening on ${bind}`);
  });

  server.listen(port, () => {
    console.log("Express server started listening on port", port);
  });

  // If the Node process ends, handle graceful shutdown
  const sigs = ["SIGINT", "SIGTERM", "SIGQUIT"];
  sigs.forEach((sig) => {
    process.on(sig, () => {
      console.log("Closing http server...");
      // Stops the server from accepting new connections and finish existing connections.
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
