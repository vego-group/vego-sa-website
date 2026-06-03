import type { CollectionProduct } from "./home";

export type DepositStepId =
  | "choose-bike"
  | "enter-details"
  | "review-order"
  | "pay-deposit"
  | "booking-confirmed";

export type DepositPhase = "details" | "review";

export type DepositPersonalInfo = {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  notes: string;
};

export type DepositFormFieldId = keyof DepositPersonalInfo;

export type DepositFormField = {
  id: DepositFormFieldId;
  label: string;
  placeholder: string;
  type: "text" | "tel" | "email" | "textarea";
  required: boolean;
  icon: "user" | "phone" | "mail" | "map-pin" | "message-square";
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
};

export type DepositProduct = CollectionProduct;
