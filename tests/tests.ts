import { fetchTimeoutRetry } from "../src/index";

export async function runTests(host: string, port: number) {
  const serverUrl = `http://${host}:${port}`;
  console.info(`Starting tests on ${serverUrl}...`);

  const successTest = await runSuccessTest(serverUrl);
  const failWithoutTimeoutTest = await runFailWithoutTimeoutTest(serverUrl);
  const failWithTimeoutTest = await runFailWithTimeoutTest(serverUrl);

  if (!successTest || !failWithoutTimeoutTest || !failWithTimeoutTest) {
    console.error("Tests failed");
    if (!successTest) {
      console.error("Success test failed");
    }
    if (!failWithoutTimeoutTest) {
      console.error("Fail without timeout test failed");
    }
    if (!failWithTimeoutTest) {
      console.error("Fail with timeout test failed");
    }
    process.exit(1);
  }

  console.info("Tests finished");
  process.exit(0);
}

async function runSuccessTest(serverUrl: string): Promise<boolean> {
  try {
    const response = await fetchTimeoutRetry(
      `${serverUrl}/success`,
      {},
      {
        maxRetries: 2,
      }
    );

    if (response.ok) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

async function runFailWithoutTimeoutTest(serverUrl: string): Promise<boolean> {
  try {
    const response = await fetchTimeoutRetry(
      `${serverUrl}/error`,
      {},
      {
        maxRetries: 4,
      }
    );

    if (!response.ok) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

async function runFailWithTimeoutTest(serverUrl: string): Promise<boolean> {
  try {
    const response = await fetchTimeoutRetry(
      `${serverUrl}/error`,
      {},
      {
        maxRetries: 4,
        timeoutMs: 5000,
      }
    );

    if (!response.ok) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}
