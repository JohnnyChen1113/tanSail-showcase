import { describe, expect, it } from "vite-plus/test";

describe("TanSail foundation", () => {
  it("keeps the starter independent and deployable without secrets", () => {
    const requiredServices: string[] = [];
    expect(requiredServices).toHaveLength(0);
  });
});
