import { describe, it, expect } from "vitest";
import {
  normalizeToProperty,
  normalizeToPropertyListing,
  validateAndNormalize,
} from "./normalizeProperty";

describe("normalizeToProperty", () => {
  it("converts minimal raw to Property", () => {
    const p = normalizeToProperty({
      id: "1",
      title: "Flat",
      address: "1 St",
      price: 1000,
      priceType: "pcm",
    });
    expect(p.id).toBe("1");
    expect(p.title).toBe("Flat");
    expect(p.mode).toBe("rent");
    expect(p.price).toBe(1000);
  });

  it("uses priceValue if price missing", () => {
    const p = normalizeToProperty({
      id: "1",
      title: "House",
      address: "2 Rd",
      priceValue: 300000,
      priceType: "total",
    });
    expect(p.price).toBe(300000);
    expect(p.mode).toBe("buy");
  });

  it("normalizes coordinates", () => {
    const p = normalizeToProperty({
      id: "1",
      title: "X",
      address: "Y",
      price: 100,
      lat: 51.5,
      lng: -0.1,
    });
    expect(p.coordinates).toEqual({ lat: 51.5, lng: -0.1 });
  });
});

describe("normalizeToPropertyListing", () => {
  it("produces displayPrice", () => {
    const p = normalizeToPropertyListing({
      id: "1",
      title: "Flat",
      address: "1 St",
      priceValue: 1200,
      priceType: "pcm",
    });
    expect(p.displayPrice).toContain("1,200");
    expect(p.displayPrice).toContain("pcm");
  });
});

describe("validateAndNormalize", () => {
  it("returns validation result", () => {
    const { property, validation } = validateAndNormalize({
      id: "1",
      title: "Flat",
      address: "1 St",
      price: 1000,
      priceType: "pcm",
    });
    expect(property.id).toBe("1");
    expect(validation.valid).toBe(true);
  });
});
