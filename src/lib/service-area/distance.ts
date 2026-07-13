import {
  NEAR_BOUNDARY_MARGIN_MILES,
  SERVICE_AREA_RADIUS_MILES,
} from "./constants";
import type { Coordinate } from "./types";

const EARTH_RADIUS_MILES = 3958.7613;

export function isValidCoordinate(coordinate: Coordinate): boolean {
  return (
    Number.isFinite(coordinate.latitude) &&
    Number.isFinite(coordinate.longitude) &&
    coordinate.latitude >= -90 &&
    coordinate.latitude <= 90 &&
    coordinate.longitude >= -180 &&
    coordinate.longitude <= 180
  );
}

function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function haversineDistanceMiles(origin: Coordinate, destination: Coordinate): number {
  if (!isValidCoordinate(origin) || !isValidCoordinate(destination)) {
    throw new RangeError("Coordinates must contain finite latitude and longitude values in range.");
  }

  const latitudeDelta = degreesToRadians(destination.latitude - origin.latitude);
  const longitudeDelta = degreesToRadians(destination.longitude - origin.longitude);
  const originLatitude = degreesToRadians(origin.latitude);
  const destinationLatitude = degreesToRadians(destination.latitude);

  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(originLatitude) *
      Math.cos(destinationLatitude) *
      Math.sin(longitudeDelta / 2) ** 2;

  return 2 * EARTH_RADIUS_MILES * Math.asin(Math.min(1, Math.sqrt(haversine)));
}

export function classifyServiceAreaDistance(distanceMiles: number): {
  withinRadius: boolean;
  nearBoundary: boolean;
} {
  if (!Number.isFinite(distanceMiles) || distanceMiles < 0) {
    throw new RangeError("Distance must be a finite, non-negative number.");
  }

  return {
    withinRadius: distanceMiles <= SERVICE_AREA_RADIUS_MILES,
    nearBoundary:
      Math.abs(distanceMiles - SERVICE_AREA_RADIUS_MILES) <= NEAR_BOUNDARY_MARGIN_MILES,
  };
}
