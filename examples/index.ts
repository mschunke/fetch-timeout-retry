import { fetchTimeoutRetry } from "../src/index";

await fetchTimeoutRetry(
  "https://myawesomeapi.xyz/path?params=123",
  {
    method: "GET",
    headers: new Headers({
      "content-type": "application/json",
    }),
  },
  {
    maxRetries: 3,
    timeoutMs: 60000, // = 1 minute
  }
);
