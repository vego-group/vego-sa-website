import type {
  HTMLAttributes,
  InputHTMLAttributes,
  SelectHTMLAttributes,
} from "react";

import type {
  TestDriveBenefit,
  TestDriveFormValues,
  TestDriveLocale,
  TestDriveMetric,
  TestDriveProductOption,
} from "@/types";

export interface TestDriveCopy {
  badge: string;
  title: string;
  description: string;
  heroNote: string;
  statsLabel: string;
  benefitsTitle: string;
  benefitsDescription: string;
  formBadge: string;
  formTitle: string;
  formDescription: string;
  productPlaceholder: string;
  genderPlaceholder: string;
  quickNoteTitle: string;
  quickNoteDescription: string;
  phoneCountryCode: string;
  phoneFlagAlt: string;
  submit: string;
  submitting: string;
  successMessage: string;
  placeholders: {
    name: string;
    email: string;
    phone: string;
    phoneExample: string;
    age: string;
    date: string;
    time: string;
  };
  labels: {
    name: string;
    email: string;
    phone: string;
    age: string;
    gender: string;
    date: string;
    time: string;
    product: string;
  };
  genders: {
    male: string;
    female: string;
  };
  validation: {
    required: string;
    email: string;
    phone: string;
    age: string;
  };
}

export interface TestDriveSectionProps {
  copy: TestDriveCopy;
  locale: TestDriveLocale;
}

export interface TestDriveHeroProps extends TestDriveSectionProps {
  metrics: TestDriveMetric[];
}

export interface TestDriveBenefitsProps extends TestDriveSectionProps {
  benefits: TestDriveBenefit[];
}

export interface TestDriveFormProps extends TestDriveSectionProps {
  products: TestDriveProductOption[];
}

export interface TestDriveFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label: string;
  prefix?: string;
  prefixIconSrc?: string;
  prefixIconAlt?: string;
}

export interface TestDriveSelectFieldProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  label: string;
}

export interface TestDriveGenderOptionProps
  extends HTMLAttributes<HTMLLabelElement> {
  checked: boolean;
  label: string;
}

export interface TestDriveProductCardProps
  extends HTMLAttributes<HTMLDivElement> {
  checked: boolean;
  option: TestDriveProductOption;
}

export interface TestDrivePageContent {
  copy: TestDriveCopy;
  metrics: TestDriveMetric[];
  benefits: TestDriveBenefit[];
  products: TestDriveProductOption[];
}

export interface TestDrivePageProps {
  content: Record<TestDriveLocale, TestDrivePageContent>;
}

export interface TestDriveFormState {
  values: TestDriveFormValues;
}
