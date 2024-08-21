import http from "http";

export function successHandler(
  req: http.IncomingMessage,
  res: http.ServerResponse
) {
  res.statusCode = 200;
  res.end("Hello world");
}
