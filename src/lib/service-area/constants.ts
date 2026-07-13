import type { Coordinate } from "./types";

export const SERVICE_AREA_RADIUS_MILES = 50;
export const NEAR_BOUNDARY_MARGIN_MILES = 2;

/**
 * Public representative point for Census ZCTA 23120, not a residence.
 *
 * Source: 2025 U.S. Census Gazetteer, ZIP Code Tabulation Areas file.
 * Record: 23120|860Z200US23120|...|37.42208|-77.781371
 * https://www.census.gov/geographies/reference-files/time-series/geo/gazetteer-files.2025.html
 *
 * The ZCTA internal point keeps distance estimates independent of any private
 * home address or residential coordinate.
 */
export const PUBLIC_MOSELEY_ZCTA_REFERENCE: Readonly<Coordinate> = Object.freeze({
  latitude: 37.42208,
  longitude: -77.781371,
});
