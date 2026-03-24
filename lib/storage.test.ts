import { describe, it, expect, beforeEach } from "vitest";
import {
  getCompareList,
  addToCompare,
  removeFromCompare,
  reorderCompare,
  COMPARE_MAX,
} from "./storage";

describe("compare selection", () => {
  beforeEach(() => {
    if (typeof localStorage !== "undefined") {
      localStorage.clear();
    }
  });

  it("enforces max 5 properties", () => {
    expect(COMPARE_MAX).toBe(5);
    for (let i = 0; i < 5; i++) {
      const result = addToCompare(`id-${i}`);
      expect(result.added).toBe(true);
      expect(result.atLimit).toBe(i === 4);
    }
    const atLimit = addToCompare("id-6");
    expect(atLimit.added).toBe(false);
    expect(atLimit.atLimit).toBe(true);
    expect(getCompareList().length).toBe(5);
  });

  it("does not duplicate same property", () => {
    addToCompare("id-1");
    const second = addToCompare("id-1");
    expect(second.added).toBe(false);
    expect(getCompareList().length).toBe(1);
  });

  it("removes and allows re-add", () => {
    addToCompare("id-1");
    addToCompare("id-2");
    removeFromCompare("id-1");
    expect(getCompareList()).toEqual(["id-2"]);
    const result = addToCompare("id-1");
    expect(result.added).toBe(true);
    expect(getCompareList()).toContain("id-1");
  });

  it("reorder preserves length", () => {
    addToCompare("a");
    addToCompare("b");
    addToCompare("c");
    const list = getCompareList();
    reorderCompare([list[2], list[0], list[1]]);
    expect(getCompareList()).toEqual([list[2], list[0], list[1]]);
  });
});
