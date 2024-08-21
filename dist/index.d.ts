interface IFetchTimeoutRetryOptions {
    timeoutMs?: number;
    maxRetries: number;
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
export declare function fetchTimeoutRetry(input: RequestInfo, init: RequestInit, { timeoutMs, maxRetries }: IFetchTimeoutRetryOptions): Promise<Response>;
export {};
