export type TestDriveLocale = "ar" | "en";

export type TestDriveDirection = "rtl" | "ltr";

export type TestDriveGender = "male" | "female";

export type TestDriveProductId =
  | "vego-2030"
  | "vg-26"
  | "vego-cem"
  | "vg-20"
  | "vr-70";

export type TestDriveMetric = {
  value: string;
  label: string;
};

export type TestDriveBenefit = {
  id: string;
  title: string;
  description: string;
};

export type TestDriveProductOption = {
  id: TestDriveProductId;
  name: string;
  tagline: string;
};

export type TestDriveFormValues = {
  name: string;
  email: string;
  phone: string;
  age: string;
  gender: TestDriveGender | "";
  date: string;
  time: string;
  product: TestDriveProductId | "";
};
