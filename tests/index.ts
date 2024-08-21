import http from "http";
import { successHandler } from "./successHandler";
import { runTests } from "./tests";

const host = "localhost";
const port = 4321;

const handler = (req: http.IncomingMessage, res: http.ServerResponse) => {
  try {
    switch (req.url) {
      case "/success": {
        successHandler(req, res);
        break;
      }
      case "/error": {
        // Cause an error after 2 seconds
        setTimeout(() => {
          res.statusCode = 500;
          res.end("Internal server error");
        }, 2000);
        break;
      }
      default: {
        res.statusCode = 404;
        res.end("Not found");
        break;
      }
    }
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.end("Internal server error");
  }
};

const server = http.createServer(handler);

server.listen(port, host, async () => {
  console.info("Server started");
  await runTests(host, port);
});
