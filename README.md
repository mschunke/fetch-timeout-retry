# Fetch Timeout Retry

A lightweight implementation of timeouts and retries to the vanilla Fetch API.

Built with Typescript, types already included.

## Installation

`npm install fetch-timeout-retry`

## Usage

Just do a regular fetch request as you would normally do, but add a third argument with the timout and retry options.

Old-way:

```
fetch("https://myawesomeapi.xyz/path?params=123", {
  method: 'GET',
  headers: (...)
})
```

With `fetch-timeout-retry`

```
import { fetchTimeoutRetry } from 'fetch-timeout-retry'

fetchTimeoutRetry("https://myawesomeapi.xyz/path?params=123", {
  method: 'GET',
  headers: (...),
  {
    timeoutMs: 30000,
    maxRetries: 3
  }
})
```

If `timeoutMs < 1` it will be ignored and only retries will be considered.

The total quantity of retries will be of the original one plus the `maxRetries` value. So, if `maxRetries` is 4, the server will be called 5 times until erroring out (1 from the original call, and 4 from the retries).

### License

MIT License

Copyright (c) 2022 Murilo Schünke

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
