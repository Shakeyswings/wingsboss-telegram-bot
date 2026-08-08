import { describe, expect, it } from "vitest";
import { corePlaceholder, pingCore } from "../src/index";

describe("@wingboss/core", () => {
  it("exports placeholder", () => {
    expect(corePlaceholder).toContain("placeholder");
  });

  it("returns pong-core", () => {
    expect(pingCore()).toBe("pong-core");
  });
});
