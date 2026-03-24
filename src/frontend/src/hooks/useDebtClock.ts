import { useQuery } from "@tanstack/react-query";
import type { NationalDebtConfig } from "../backend.d";
import { useActor } from "./useActor";

export function useNationalDebtConfig() {
  const { actor, isFetching } = useActor();
  return useQuery<NationalDebtConfig>({
    queryKey: ["nationalDebtConfig"],
    queryFn: async () => {
      if (!actor) {
        return {
          baselineDebtCents: BigInt("3655012345678900"),
          referenceTimestamp: BigInt(Math.floor(Date.now() / 1000)),
          ratePerSecondCents: BigInt("106400"),
          usPopulation: BigInt("335000000"),
          usTaxpayers: BigInt("150000000"),
        };
      }
      return actor.getNationalDebtConfig();
    },
    enabled: !isFetching,
    staleTime: 60_000,
    refetchInterval: 300_000,
  });
}

export function calcCurrentDebtExact(
  config: NationalDebtConfig,
  nowMs: number,
): number {
  const nowSec = nowMs / 1000;
  const refSec = Number(config.referenceTimestamp);
  const elapsed = Math.max(0, nowSec - refSec);
  const ratePerSecDollars = Number(config.ratePerSecondCents) / 100;
  const baselineDollars = Number(config.baselineDebtCents) / 100;
  return baselineDollars + ratePerSecDollars * elapsed;
}
