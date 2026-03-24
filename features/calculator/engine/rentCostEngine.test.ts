import { describe, it, expect } from "vitest";
import { calculateRentCost } from "./rentCostEngine";

describe("calculateRentCost", () => {
  it("returns rent + council tax + utilities + insurance", () => {
    const r = calculateRentCost({ rent: 1000, councilTaxBand: "D" });
    expect(r.rent).toBe(1000);
    expect(r.councilTax).toBe(150); // 1800/12
    expect(r.utilities.total).toBeGreaterThan(0);
    expect(r.insurance).toBe(15);
    expect(r.totalMonthly).toBe(r.rent + r.councilTax + r.utilities.total + r.insurance);
  });

  it("handles zero rent", () => {
    const r = calculateRentCost({ rent: 0 });
    expect(r.totalMonthly).toBeGreaterThanOrEqual(0);
  });

  it("handles council tax override", () => {
    const r = calculateRentCost({
      rent: 1200,
      councilTaxMonthly: 200,
    });
    expect(r.councilTax).toBe(200);
  });

  it("handles missing council tax band", () => {
    const r = calculateRentCost({ rent: 1000 });
    expect(r.councilTax).toBe(0);
  });

  it("handles service charge and ground rent", () => {
    const r = calculateRentCost({
      rent: 1000,
      serviceCharge: 100,
      groundRentYearly: 300,
    });
    expect(r.serviceCharge).toBe(100);
    expect(r.groundRent).toBe(25);
    const expected = r.rent + r.councilTax + r.utilities.total + r.insurance + 100 + 25;
    expect(r.totalMonthly).toBe(expected);
  });
});
