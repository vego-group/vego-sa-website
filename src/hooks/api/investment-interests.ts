import { investmentInterestsAPI } from "@/services/queries/investment-interests";
import { useCustomQuery } from "../useCustomQuery";

export function useInvestmentInterests(page: number) {
  return useCustomQuery(["investment-interests", page], async () =>
    investmentInterestsAPI(page),
  );
}
