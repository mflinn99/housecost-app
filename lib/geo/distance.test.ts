import { describe, it, expect } from "vitest";
import { haversineKm, haversineMetres } from "./distance";

describe("haversineKm", () => {
  it("returns 0 for same point", () => {
    const p = { lat: 51.5, lng: -0.1 };
    expect(haversineKm(p, p)).toBe(0);
  });

  it("returns ~1km for points ~0.01 deg apart at mid-lat", () => {
    const a = { lat: 51.5, lng: -0.1 };
    const b = { lat: 51.5, lng: -0.09 }; // ~1km east
    const d = haversineKm(a, b);
    expect(d).toBeGreaterThan(0.7);
    expect(d).toBeLessThan(1.3);
  });

  it("London to Manchester is ~260km", () => {
    const london = { lat: 51.507, lng: -0.127 };
    const manchester = { lat: 53.48, lng: -2.24 };
    const d = haversineKm(london, manchester);
    expect(d).toBeGreaterThan(250);
    expect(d).toBeLessThan(270);
  });
});

describe("haversineMetres", () => {
  it("returns metres for km * 1000", () => {
    const a = { lat: 51.5, lng: -0.1 };
    const b = { lat: 51.51, lng: -0.1 };
    expect(haversineMetres(a, b)).toBe(haversineKm(a, b) * 1000);
  });
});
