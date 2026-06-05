import type { CollectionProduct } from "./home";

export type DepositStepId =
  | "choose-bike"
  | "enter-details"
  | "booking-confirmed";

export type DepositPhase = "details" | "booking-confirmed";

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
    editLabel: string;
    submitLabel: string;
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

export type PreordersApiResponse = {
  success: boolean;
  message: string;
  preorder: {
    id: number;
    product: string;
    deposit_amount: number;
    status: string;
    payment_status: string;
  };
  checkout_url: string;
};

export type PreorderApiResponse = {
  success: boolean;
  preorder: Preorder;
};

export type PreorderLookupApiResponse = {
  success: boolean;
  data: Preorder[];
};
