interface IFetchTimeoutRetryOptions {
  timeoutMs?: number;
  maxRetries: number;
}

interface IFetchTimeoutRetryInternalOptions extends IFetchTimeoutRetryOptions {
  currentAttempt: number;
}

function fetchTimeoutRetryInternal(
  input: RequestInfo,
  init: RequestInit,
  {
    timeoutMs = 0,
    maxRetries,
    currentAttempt,
  }: IFetchTimeoutRetryInternalOptions
): Promise<Response> {
  // Regular request
  const fetchReq = fetch(input, init);

  // Timeout function
  const timeout = (timeoutMs: number) =>
    new Promise((_, reject) =>
      setTimeout(
        () =>
          reject(
            new Error(`${currentAttempt} timeouts for ${input.toString()}`)
          ),
        timeoutMs
      )
    );

  if (timeoutMs < 1) {
    return Promise.race([fetchReq])
      .then((res) => {
        return res;
      })
      .catch((err) => {
        if (currentAttempt < maxRetries) {
          return fetchTimeoutRetryInternal(input, init, {
            maxRetries,
            timeoutMs,
            currentAttempt: currentAttempt + 1,
          });
        }
        throw err;
      });
  }

  // Return whatever resolves first fetchReq or timeout
  return Promise.race([fetchReq, timeout(timeoutMs)])
    .then((res) => {
      if (res instanceof Response) return res;

      throw new Error("fetchTimeoutRetry error: unexcepted value");
    })
    .catch((err) => {
      if (currentAttempt < maxRetries) {
        return fetchTimeoutRetryInternal(input, init, {
          maxRetries,
          timeoutMs,
          currentAttempt: currentAttempt + 1,
        });
      }
      throw err;
    });
}

/**
 * Extended version of the native fetch API, includes third argument with timeout and retries options.
 * @param input RequestInfo: Regular fetch api parameter
 * @param init RequestInit: Regular fetch api parameter
 * @param param2 Object with retries/timeout options
 * - maxRetries: number: Number of attempts
 * - timeoutMs: number: Request timeout (defaults to 0 = no timeout)
 * @returns throw Error or default fetch API response
 */
export function fetchTimeoutRetry(
  input: RequestInfo,
  init: RequestInit,
  { timeoutMs = 0, maxRetries }: IFetchTimeoutRetryOptions
) {
  return fetchTimeoutRetryInternal(input, init, {
    timeoutMs,
    maxRetries,
    currentAttempt: 0,
  });
}
