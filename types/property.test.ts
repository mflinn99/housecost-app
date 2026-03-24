import { describe, it, expect } from "vitest";
import { validateProperty, isPropertyLike } from "./property";

describe("validateProperty", () => {
  it("validates a minimal valid property", () => {
    const result = validateProperty({
      id: "1",
      title: "2 Bed Flat",
      address: "1 Test St",
      mode: "rent",
      price: 1200,
    });
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("rejects null", () => {
    const result = validateProperty(null);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Property must be an object");
  });

  it("rejects missing required fields", () => {
    const result = validateProperty({ id: "1" });
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes("title"))).toBe(true);
  });

  it("rejects invalid mode", () => {
    const result = validateProperty({
      id: "1",
      title: "Flat",
      address: "1 St",
      mode: "invalid",
      price: 100,
    });
    expect(result.valid).toBe(false);
  });

  it("rejects negative price", () => {
    const result = validateProperty({
      id: "1",
      title: "Flat",
      address: "1 St",
      mode: "rent",
      price: -100,
    });
    expect(result.valid).toBe(false);
  });

  it("rejects invalid coordinates", () => {
    const result = validateProperty({
      id: "1",
      title: "Flat",
      address: "1 St",
      mode: "rent",
      price: 100,
      coordinates: { lat: 200, lng: 0 },
    });
    expect(result.valid).toBe(false);
  });

  it("accepts valid coordinates", () => {
    const result = validateProperty({
      id: "1",
      title: "Flat",
      address: "1 St",
      mode: "buy",
      price: 250000,
      coordinates: { lat: 51.5, lng: -0.1 },
    });
    expect(result.valid).toBe(true);
  });
});

describe("isPropertyLike", () => {
  it("returns true for valid property shape", () => {
    expect(isPropertyLike({
      id: "1",
      title: "Flat",
      address: "1 St",
      mode: "rent",
      price: 1200,
    })).toBe(true);
  });

  it("returns false for null", () => {
    expect(isPropertyLike(null)).toBe(false);
  });

  it("returns false for missing price", () => {
    expect(isPropertyLike({
      id: "1",
      title: "Flat",
      address: "1 St",
      mode: "rent",
    })).toBe(false);
  });
});
