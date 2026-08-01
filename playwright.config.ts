import { defineConfig } from "@playwright/test";

const browserChannel = process.env.TANSAIL_BROWSER_CHANNEL;
const testPort = process.env.TANSAIL_TEST_PORT ?? "4173";

export default defineConfig({
  testDir: "./tests/visual",
  outputDir: "./test-results/visual",
  timeout: 60_000,
  fullyParallel: true,
  forbidOnly: true,
  retries: 0,
  reporter: "list",
  snapshotPathTemplate: "{testDir}/__snapshots__/{testName}-{projectName}{ext}",
  expect: {
    toHaveScreenshot: {
      animations: "disabled",
      caret: "hide",
      maxDiffPixelRatio: 0.01,
    },
  },
  use: {
    ...(browserChannel ? { channel: browserChannel } : {}),
    baseURL: `http://127.0.0.1:${testPort}`,
    colorScheme: "light",
    locale: "en-US",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "desktop",
      use: { viewport: { width: 1440, height: 1000 } },
    },
    {
      name: "mobile",
      use: { viewport: { width: 390, height: 844 } },
    },
  ],
  webServer: {
    command: `./node_modules/.bin/vp dev --host 127.0.0.1 --port ${testPort}`,
    url: `http://127.0.0.1:${testPort}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
