export interface CompaniesRegisterPayload {
  // Required
  company_name: string;
  contact_person_name: string;
  contact_phone: string;
  contact_email: string;
  commercial_reg_no: string;
  commercial_reg_file: File;

  // Optional
  commercial_license_file?: File;
  sales_contract_file?: File;
  address?: string;
  city?: string;
  region?: string;
  max_motorcycles?: number;
  max_drivers?: number;
  billing_type?: "prepaid" | "postpaid";
  tax_id?: string;
}

export interface CompaniesRegisterResponse {
  success: boolean;
  message: string;
  data?: {
    id: string | number;
    company_name: string;
    status: string;
  };
}

export type BillingType = "prepaid" | "postpaid";