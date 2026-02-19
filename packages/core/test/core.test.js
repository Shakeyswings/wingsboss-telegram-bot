import test from "node:test";
import assert from "node:assert/strict";
import { corePlaceholder, pingCore } from "../src/index.js";

test("exports placeholder", () => {
  assert.match(corePlaceholder, /placeholder/);
});

test("returns pong-core", () => {
  assert.equal(pingCore(), "pong-core");
});
