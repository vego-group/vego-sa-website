import type {
  DepositFormField,
  DepositPersonalInfo,
  DepositPhase,
  DepositProduct,
  DepositStep,
} from "@/types/landing/deposit";

export interface DepositPageContentProps {
  initialProductId?: string;
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
  product: DepositProduct;
  variant?: "compact" | "review";
}

export interface PersonalInfoFormProps {
  fields: DepositFormField[];
  form: DepositPersonalInfo;
  product: DepositProduct;
  onChange: (field: keyof DepositPersonalInfo, value: string) => void;
  onSubmit: () => void;
}

export interface DepositFormFieldProps {
  field: DepositFormField;
  value: string;
  onChange: (value: string) => void;
}

export interface DepositReviewProps {
  form: DepositPersonalInfo;
  product: DepositProduct;
  onBack: () => void;
  onSubmit: () => void;
}

export interface DepositReviewFieldProps {
  label: string;
  value: string;
}
