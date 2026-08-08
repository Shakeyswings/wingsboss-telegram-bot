import { describe, expect, it } from "vitest";
import { corePlaceholder, formatMenu, menu, pingCore } from "../src/index.js";

describe("@wingboss/core", () => {
  it("exports placeholder", () => {
    expect(corePlaceholder).toContain("placeholder");
  });

  it("returns pong-core", () => {
    expect(pingCore()).toBe("pong-core");
  });

  it("contains the audited menu prices", () => {
    expect(menu.items.find(({ code }) => code === "A1")?.options).toEqual([
      { label: "6 pc", price: 10.95 },
      { label: "10 pc", price: 14.95 }
    ]);
    expect(menu.items.find(({ code }) => code === "C5")?.options[0].price).toBe(13);
  });

  it("formats a customer-readable menu", () => {
    const text = formatMenu();

    expect(text).toContain("A5 Boneless Wings");
    expect(text).toContain("48 pc $51.95");
    expect(text.length).toBeLessThan(4096);
  });
});
