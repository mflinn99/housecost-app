/**
 * Transport scoring
 * Shorter walk = higher score (0-10)
 */

import type { TransportInput } from "./types";

export function scoreTransport(transport: TransportInput = {}): number {
  const bus = transport.nearestBusMinutes ?? 999;
  const train = transport.nearestTrainMinutes ?? 999;
  const tram = transport.nearestTramMinutes ?? 999;

  const best = Math.min(bus, train, tram);
  if (best >= 30) return 0;
  if (best <= 2) return 10;
  if (best <= 5) return 8;
  if (best <= 10) return 6;
  if (best <= 15) return 4;
  if (best <= 20) return 2;
  return 1;
}
