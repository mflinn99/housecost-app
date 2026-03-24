import { describe, it, expect } from "vitest";
import { formatCurrency, formatNumber } from "./utils";

describe("formatCurrency", () => {
  it("formats pounds correctly", () => {
    expect(formatCurrency(1500)).toBe("£1,500");
    expect(formatCurrency(250000)).toBe("£250,000");
  });

  it("adds pcm when option set", () => {
    expect(formatCurrency(1200, { pcm: true })).toBe("£1,200 pcm");
  });

  it("handles compact format", () => {
    expect(formatCurrency(1500, { compact: true })).toBe("£1,500");
  });
});

describe("formatNumber", () => {
  it("formats with commas", () => {
    expect(formatNumber(1234567)).toBe("1,234,567");
    expect(formatNumber(100)).toBe("100");
  });

  it("respects decimals", () => {
    expect(formatNumber(123.45, 2)).toBe("123.45");
  });
});
