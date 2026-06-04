import type {
  Control,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import type {
  CreatePreOrderFormInput,
  CreatePreOrderFormSchema,
  PayPreOrderFormInput,
} from "@/schemas";
import type {
  DepositFormField,
  DepositPhase,
  DepositStep,
  Preorder,
} from "@/types/landing/deposit";

export interface DepositPageContentProps {
  initialProductSlug?: string;
}

export interface DepositHeroProps {
  phase: DepositPhase;
}

export interface DepositStepperProps {
  steps: DepositStep[];
  phase: DepositPhase;
}

export interface DepositStepItemProps {
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  label: string;
}

export interface DepositProductSummaryProps {
  productSlug: string;
  variant?: "compact" | "review";
}

export interface PersonalInfoFormProps {
  fields: DepositFormField[];
  productSlug: string;
  control: Control<CreatePreOrderFormInput>;
  errors: FieldErrors<CreatePreOrderFormInput>;
  isSubmitting: boolean;
  register: UseFormRegister<CreatePreOrderFormInput>;
  onSubmit: () => void;
}

export interface DepositFormFieldProps {
  field: DepositFormField;
  control: Control<CreatePreOrderFormInput>;
  error?: string;
  register: UseFormRegister<CreatePreOrderFormInput>;
}

export interface DepositReviewProps {
  form: CreatePreOrderFormSchema;
  productSlug: string;
  isSubmitting: boolean;
  onBack: () => void;
  onSubmit: () => void;
}

export interface DepositReviewFieldProps {
  label: string;
  value: string;
}

export interface PayDepositFormProps {
  productSlug: string;
  errors: FieldErrors<PayPreOrderFormInput>;
  isSubmitting: boolean;
  register: UseFormRegister<PayPreOrderFormInput>;
  onBack: () => void;
  onSubmit: () => void;
}

export interface DepositPreorderResponseProps {
  preorder: Preorder;
}
