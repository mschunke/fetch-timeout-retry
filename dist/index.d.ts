interface IFetchTimeoutRetryOptions {
    timeoutMs?: number;
    maxRetries: number;
}
export declare function fetchTimeoutRetry(input: RequestInfo, init: RequestInit, { timeoutMs, maxRetries }: IFetchTimeoutRetryOptions): Promise<Response>;
export {};
