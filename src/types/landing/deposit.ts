import type { CollectionProduct } from "./home";

export type DepositStepId =
  | "choose-bike"
  | "enter-details"
  | "pay-deposit"
  | "booking-confirmed";

export type DepositPhase = "details" | "pay-deposit" | "booking-confirmed";

export type DepositPersonalInfo = {
  fullName: string;
  phone: string;
  email: string;
  city: string;
};

export type DepositFormFieldId = keyof DepositPersonalInfo;

export type DepositFormField = {
  id: DepositFormFieldId;
  label: string;
  placeholder: string;
  type: "text" | "tel" | "email" | "select";
  required: boolean;
  icon: "user" | "phone" | "mail" | "map-pin";
  options?: string[];
};

export type DepositStep = {
  id: DepositStepId;
  label: string;
};

export type DepositCopy = {
  details: {
    title: string;
    highlight: string;
    description: string;
    submitLabel: string;
  };
  review: {
    title: string;
    highlight: string;
    description: string;
    submitLabel: string;
    editLabel: string;
  };
  "pay-deposit": {
    title: string;
    highlight: string;
    description: string;
    submitLabel: string;
    backLabel: string;
  };
  "booking-confirmed": {
    title: string;
    highlight: string;
    description: string;
  };
};

export type DepositProduct = CollectionProduct;

export type PreorderStatus = {
  value: string;
  label: string;
};

export type Preorder = {
  id: number;
  customer_name: string;
  phone: string;
  email: string;
  city: string;
  product_name: string;
  deposit_amount: string;
  payment_reference: string;
  payment_status: PreorderStatus;
  status: PreorderStatus;
  created_at: string;
};

export type PreorderPaymentConfig = {
  publishable_key: string;
  callback_url: string;
  amount_halalas: number;
  currency: string;
  description: string;
};

export type PreordersApiResponse = {
  success: boolean;
  message: string;
  preorder: Preorder;
  payment: PreorderPaymentConfig;
};

export type PreorderApiResponse = {
  success: boolean;
  preorder: Preorder;
};

export type PayPreorderStatus = "paid" | "redirect" | "failed";

export type PayPreorderApiResponse = {
  success: boolean;
  status: PayPreorderStatus;
  message: string;
  redirect_url?: string;
  preorder: Pick<Preorder, "id" | "payment_status" | "status">;
};

export type PreorderLookupApiResponse = {
  success: boolean;
  data: Preorder[];
};

export type MoyasarCardTokenResponse = {
  id: string;
  status?: string;
  brand?: string;
  funding?: string;
  country?: string;
  month?: string;
  year?: string;
  name?: string;
  last_four?: string;
  verification_url?: string;
  message?: string | null;
  metadata?: unknown;
  created_at?: string;
  updated_at?: string;
  expires_at?: string;
};

export type MoyasarErrorResponse = {
  message?: string;
  errors?: unknown;
  type?: string;
};
