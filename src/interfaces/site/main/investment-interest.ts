export type InvestmentTicketType =
  | "50000-100000"
  | "100000-200000"
  | "250000-350000"
  | "350000+";

export interface InvestmentInterestPayload {
  full_name: string;
  phone_number: string;
  email?: string;
  ticket_type: InvestmentTicketType | string;
}

export interface InvestmentInterest
  extends Omit<InvestmentInterestPayload, "email"> {
  id: number | string;
  email?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}
