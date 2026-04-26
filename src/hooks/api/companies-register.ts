import { useMutation } from "@tanstack/react-query";
import { registerCompanyAPI } from "@/services/mutations/companies-register";
import type { CompaniesRegisterSchema } from "@/schemas/companies-register";

function buildFormData(values: CompaniesRegisterSchema): FormData {
  const formData = new FormData();

  // Required fields
  formData.append("company_name", values.company_name);
  formData.append("contact_person_name", values.contact_person_name);
  formData.append("contact_phone", values.contact_phone);
  formData.append("contact_email", values.contact_email);
  formData.append("commercial_reg_no", values.commercial_reg_no);
  formData.append("commercial_reg_file", values.commercial_reg_file);

  // Optional file fields
  if (values.commercial_license_file) {
    formData.append("commercial_license_file", values.commercial_license_file);
  }
  if (values.sales_contract_file) {
    formData.append("sales_contract_file", values.sales_contract_file);
  }

  // Optional text fields
  if (values.address) formData.append("address", values.address);
  if (values.city) formData.append("city", values.city);
  if (values.region) formData.append("region", values.region);
  if (values.tax_id) formData.append("tax_id", values.tax_id);
  if (values.billing_type) formData.append("billing_type", values.billing_type);

  // Optional number fields
  if (
    values.max_motorcycles !== undefined &&
    !Number.isNaN(values.max_motorcycles)
  ) {
    formData.append("max_motorcycles", String(values.max_motorcycles));
  }
  if (
    values.max_drivers !== undefined &&
    !Number.isNaN(values.max_drivers)
  ) {
    formData.append("max_drivers", String(values.max_drivers));
  }

  return formData;
}

export function useRegisterCompany() {
  return useMutation({
    mutationKey: ["register-company"],
    mutationFn: async (values: CompaniesRegisterSchema) => {
      const formData = buildFormData(values);
      return await registerCompanyAPI(formData);
    },
  });
}