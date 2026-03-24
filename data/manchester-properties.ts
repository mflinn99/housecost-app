import type { PropertyType } from "@/types";

export interface ManchesterPropertyRecord {
  id: string;
  postcode: string;
  postcodeDistrict: string;
  price: number;
  bedrooms: number;
  propertyType: PropertyType;
  daysOnMarket: number;
  latitude: number;
  longitude: number;
  sourceLabel: "Rightmove sample" | "Land Registry derived";
}

export const MANCHESTER_PROPERTIES: ManchesterPropertyRecord[] = [
  { id: "m1-001", postcode: "M1 1AE", postcodeDistrict: "M1", price: 238000, bedrooms: 1, propertyType: "flat", daysOnMarket: 12, latitude: 53.4795, longitude: -2.2362, sourceLabel: "Rightmove sample" },
  { id: "m1-002", postcode: "M1 1FN", postcodeDistrict: "M1", price: 252000, bedrooms: 2, propertyType: "flat", daysOnMarket: 19, latitude: 53.4769, longitude: -2.2353, sourceLabel: "Rightmove sample" },
  { id: "m1-003", postcode: "M1 2HF", postcodeDistrict: "M1", price: 261000, bedrooms: 2, propertyType: "flat", daysOnMarket: 28, latitude: 53.4758, longitude: -2.2307, sourceLabel: "Land Registry derived" },
  { id: "m1-004", postcode: "M1 3BU", postcodeDistrict: "M1", price: 274000, bedrooms: 2, propertyType: "flat", daysOnMarket: 33, latitude: 53.4782, longitude: -2.2288, sourceLabel: "Rightmove sample" },
  { id: "m1-005", postcode: "M1 4EX", postcodeDistrict: "M1", price: 296000, bedrooms: 3, propertyType: "maisonette", daysOnMarket: 42, latitude: 53.4744, longitude: -2.2259, sourceLabel: "Rightmove sample" },
  { id: "m1-006", postcode: "M1 6AQ", postcodeDistrict: "M1", price: 229000, bedrooms: 1, propertyType: "flat", daysOnMarket: 15, latitude: 53.4771, longitude: -2.2411, sourceLabel: "Land Registry derived" },

  { id: "m2-001", postcode: "M2 1DW", postcodeDistrict: "M2", price: 249000, bedrooms: 1, propertyType: "flat", daysOnMarket: 11, latitude: 53.4832, longitude: -2.2431, sourceLabel: "Rightmove sample" },
  { id: "m2-002", postcode: "M2 2JT", postcodeDistrict: "M2", price: 267000, bedrooms: 2, propertyType: "flat", daysOnMarket: 24, latitude: 53.4843, longitude: -2.2428, sourceLabel: "Rightmove sample" },
  { id: "m2-003", postcode: "M2 3AW", postcodeDistrict: "M2", price: 281000, bedrooms: 2, propertyType: "flat", daysOnMarket: 31, latitude: 53.4851, longitude: -2.2465, sourceLabel: "Land Registry derived" },
  { id: "m2-004", postcode: "M2 4WQ", postcodeDistrict: "M2", price: 322000, bedrooms: 3, propertyType: "flat", daysOnMarket: 38, latitude: 53.486, longitude: -2.2452, sourceLabel: "Rightmove sample" },
  { id: "m2-005", postcode: "M2 5DB", postcodeDistrict: "M2", price: 259000, bedrooms: 2, propertyType: "flat", daysOnMarket: 22, latitude: 53.4824, longitude: -2.2471, sourceLabel: "Land Registry derived" },
  { id: "m2-006", postcode: "M2 6NN", postcodeDistrict: "M2", price: 241000, bedrooms: 1, propertyType: "studio", daysOnMarket: 9, latitude: 53.4818, longitude: -2.2443, sourceLabel: "Rightmove sample" },

  { id: "m3-001", postcode: "M3 1AR", postcodeDistrict: "M3", price: 318000, bedrooms: 2, propertyType: "flat", daysOnMarket: 17, latitude: 53.4869, longitude: -2.2524, sourceLabel: "Rightmove sample" },
  { id: "m3-002", postcode: "M3 2LF", postcodeDistrict: "M3", price: 337000, bedrooms: 3, propertyType: "terraced", daysOnMarket: 27, latitude: 53.4881, longitude: -2.2553, sourceLabel: "Rightmove sample" },
  { id: "m3-003", postcode: "M3 3HE", postcodeDistrict: "M3", price: 356000, bedrooms: 3, propertyType: "flat", daysOnMarket: 39, latitude: 53.487, longitude: -2.2497, sourceLabel: "Land Registry derived" },
  { id: "m3-004", postcode: "M3 4LP", postcodeDistrict: "M3", price: 344000, bedrooms: 2, propertyType: "flat", daysOnMarket: 35, latitude: 53.4757, longitude: -2.2502, sourceLabel: "Rightmove sample" },
  { id: "m3-005", postcode: "M3 5JT", postcodeDistrict: "M3", price: 329000, bedrooms: 2, propertyType: "flat", daysOnMarket: 26, latitude: 53.4892, longitude: -2.2588, sourceLabel: "Land Registry derived" },
  { id: "m3-006", postcode: "M3 7NW", postcodeDistrict: "M3", price: 362000, bedrooms: 3, propertyType: "terraced", daysOnMarket: 44, latitude: 53.4878, longitude: -2.2528, sourceLabel: "Rightmove sample" },

  { id: "m4-001", postcode: "M4 1BD", postcodeDistrict: "M4", price: 232000, bedrooms: 1, propertyType: "flat", daysOnMarket: 13, latitude: 53.4859, longitude: -2.2334, sourceLabel: "Rightmove sample" },
  { id: "m4-002", postcode: "M4 2DG", postcodeDistrict: "M4", price: 246000, bedrooms: 2, propertyType: "flat", daysOnMarket: 20, latitude: 53.4867, longitude: -2.2289, sourceLabel: "Land Registry derived" },
  { id: "m4-003", postcode: "M4 3AQ", postcodeDistrict: "M4", price: 257000, bedrooms: 2, propertyType: "flat", daysOnMarket: 29, latitude: 53.4881, longitude: -2.2261, sourceLabel: "Rightmove sample" },
  { id: "m4-004", postcode: "M4 4DZ", postcodeDistrict: "M4", price: 268000, bedrooms: 2, propertyType: "flat", daysOnMarket: 34, latitude: 53.4847, longitude: -2.2247, sourceLabel: "Rightmove sample" },
  { id: "m4-005", postcode: "M4 5EG", postcodeDistrict: "M4", price: 279000, bedrooms: 2, propertyType: "flat", daysOnMarket: 40, latitude: 53.4849, longitude: -2.2271, sourceLabel: "Land Registry derived" },
  { id: "m4-006", postcode: "M4 6BT", postcodeDistrict: "M4", price: 223000, bedrooms: 1, propertyType: "studio", daysOnMarket: 16, latitude: 53.4894, longitude: -2.2328, sourceLabel: "Rightmove sample" },

  { id: "m5-001", postcode: "M5 3AN", postcodeDistrict: "M5", price: 241000, bedrooms: 1, propertyType: "flat", daysOnMarket: 10, latitude: 53.4742, longitude: -2.2831, sourceLabel: "Rightmove sample" },
  { id: "m5-002", postcode: "M5 3TE", postcodeDistrict: "M5", price: 256000, bedrooms: 2, propertyType: "flat", daysOnMarket: 21, latitude: 53.4723, longitude: -2.2839, sourceLabel: "Rightmove sample" },
  { id: "m5-003", postcode: "M5 4LT", postcodeDistrict: "M5", price: 266000, bedrooms: 2, propertyType: "flat", daysOnMarket: 28, latitude: 53.4684, longitude: -2.2798, sourceLabel: "Land Registry derived" },
  { id: "m5-004", postcode: "M5 5EB", postcodeDistrict: "M5", price: 274000, bedrooms: 2, propertyType: "flat", daysOnMarket: 36, latitude: 53.4711, longitude: -2.2709, sourceLabel: "Rightmove sample" },
  { id: "m5-005", postcode: "M5 6PL", postcodeDistrict: "M5", price: 287000, bedrooms: 2, propertyType: "terraced", daysOnMarket: 43, latitude: 53.4694, longitude: -2.2653, sourceLabel: "Land Registry derived" },
  { id: "m5-006", postcode: "M5 7LW", postcodeDistrict: "M5", price: 301000, bedrooms: 3, propertyType: "terraced", daysOnMarket: 47, latitude: 53.4678, longitude: -2.2596, sourceLabel: "Rightmove sample" },

  { id: "m6-001", postcode: "M6 5RW", postcodeDistrict: "M6", price: 289000, bedrooms: 3, propertyType: "semi-detached", daysOnMarket: 18, latitude: 53.4947, longitude: -2.2918, sourceLabel: "Rightmove sample" },
  { id: "m6-002", postcode: "M6 6FY", postcodeDistrict: "M6", price: 304000, bedrooms: 3, propertyType: "semi-detached", daysOnMarket: 27, latitude: 53.4902, longitude: -2.3006, sourceLabel: "Rightmove sample" },
  { id: "m6-003", postcode: "M6 7HE", postcodeDistrict: "M6", price: 318000, bedrooms: 3, propertyType: "house", daysOnMarket: 34, latitude: 53.4959, longitude: -2.3066, sourceLabel: "Land Registry derived" },
  { id: "m6-004", postcode: "M6 8AR", postcodeDistrict: "M6", price: 276000, bedrooms: 2, propertyType: "terraced", daysOnMarket: 23, latitude: 53.501, longitude: -2.3038, sourceLabel: "Rightmove sample" },
  { id: "m6-005", postcode: "M6 8QJ", postcodeDistrict: "M6", price: 331000, bedrooms: 4, propertyType: "semi-detached", daysOnMarket: 41, latitude: 53.5032, longitude: -2.2977, sourceLabel: "Land Registry derived" },
  { id: "m6-006", postcode: "M6 9HR", postcodeDistrict: "M6", price: 264000, bedrooms: 2, propertyType: "terraced", daysOnMarket: 29, latitude: 53.5054, longitude: -2.2914, sourceLabel: "Rightmove sample" },
];
