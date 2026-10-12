import { describe, expect, it } from "vitest";
import { deals, defaultStore, filterDeals, percentOff, stores } from "@/lib/deals";

describe("Big Box Finds deal rules", () => {
  it("has only the three requested stores", () => {
    expect(stores).toEqual(["Walmart", "Costco", "Target"]);
  });
  it("selects Walmart initially", () => {
    expect(defaultStore).toBe("Walmart");
  });
  it.each(["Walmart", "Costco", "Target"] as const)("has four sample deals for %s", (store) => {
    expect(filterDeals(store)).toHaveLength(4);
  });
  it("has twelve sample deals total", () => {
    expect(deals).toHaveLength(12);
  });
  it("intersects category and store filters", () => {
    const result = filterDeals("Walmart", "Kitchen");
    expect(result.map((deal) => deal.title)).toEqual(["6-Quart Digital Air Fryer", "10-Piece Non-Stick Cookware Set"]);
  });
  it("returns an empty result for an unavailable store-category combination", () => {
    expect(filterDeals("Costco", "Beauty")).toEqual([]);
  });
  it("calculates percentage off automatically from the two prices", () => {
    expect(percentOff({ ...deals[0], oldPrice: 100, newPrice: 75 })).toBe(25);
    expect(percentOff({ ...deals[0], oldPrice: 129, newPrice: 79 })).toBe(39);
  });
});