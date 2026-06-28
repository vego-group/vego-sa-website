import type { InvestmentInterest } from "@/interfaces";

export interface InvestmentInterestsStatistics {
  total?: number;
  ticket_types?: Record<string, number>;
}

export interface InvestmentInterestsMeta {
  current_page?: number;
  last_page?: number;
  per_page?: number;
  total?: number;
  from?: number | null;
  to?: number | null;
}

export interface InvestmentInterestsResponse {
  status?: string;
  message?: string;
  data?: InvestmentInterest[];
  statistics?: InvestmentInterestsStatistics;
  meta?: InvestmentInterestsMeta;
  links?: {
    first?: string | null;
    last?: string | null;
    prev?: string | null;
    next?: string | null;
  };
}
