import { describe, it, expect } from "vitest";
import {
  getMockAreaIntelligence,
  getMockPriceTrend,
  getMockDistribution,
} from "./mock-area";

describe("mock-area", () => {
  describe("getMockAreaIntelligence", () => {
    it("returns area data with required fields", () => {
      const area = getMockAreaIntelligence();
      expect(area.demographics).toBeDefined();
      expect(area.amenities).toBeDefined();
      expect(area.scores).toBeDefined();
      expect(area.amenities.bars).toBeGreaterThanOrEqual(0);
      expect(area.scores.lifestyle).toBeGreaterThanOrEqual(1);
      expect(area.scores.lifestyle).toBeLessThanOrEqual(10);
    });

    it("returns enhanced amenities when available", () => {
      const area = getMockAreaIntelligence({ lat: 51.52, lng: -0.1 });
      expect(area.amenities.takeaways).toBeDefined();
      expect(area.amenities.parks).toBeDefined();
    });

    it("returns sports and event venues", () => {
      const area = getMockAreaIntelligence({ lat: 53.48, lng: -2.24 });
      expect(area.sportsVenues).toBeDefined();
      expect(area.eventVenues).toBeDefined();
      expect(area.eventActivityLevel).toBeDefined();
    });

    it("returns local highlights", () => {
      const area = getMockAreaIntelligence();
      expect(area.localHighlights).toBeDefined();
      expect(area.localHighlights?.foodAndDrink).toBeDefined();
    });

    it("returns area summary", () => {
      const area = getMockAreaIntelligence({ lat: 51.52, lng: -0.1 });
      expect(area.areaSummary).toBeTruthy();
    });
  });

  describe("getMockPriceTrend", () => {
    it("returns 6 months of data", () => {
      const trend = getMockPriceTrend(200000);
      expect(trend.length).toBe(6);
    });

    it("each point has month and price", () => {
      const trend = getMockPriceTrend(100000);
      trend.forEach((p) => {
        expect(p.month).toMatch(/^\d{4}-\d{2}$/);
        expect(p.price).toBeGreaterThan(0);
      });
    });
  });

  describe("getMockDistribution", () => {
    it("returns bands for buy", () => {
      const dist = getMockDistribution(300000);
      expect(dist.length).toBeGreaterThan(0);
      expect(dist[0]).toHaveProperty("band");
      expect(dist[0]).toHaveProperty("count");
    });

    it("returns bands for rent", () => {
      const dist = getMockDistribution(1500);
      expect(dist.length).toBeGreaterThan(0);
    });
  });
});
