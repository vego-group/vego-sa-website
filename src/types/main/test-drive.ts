export type TestDriveLocale = "ar" | "en";

export type TestDriveDirection = "rtl" | "ltr";

export type TestDriveGender = "Male" | "Female";

export type TestDriveProductId =
  | "Vego 2030"
  | "VG-26"
  | "Vego-CEM"
  | "VG-20"
  | "VR-70";

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
  id: string;
  name: string;
  tagline: string;
};

export type TestDriveFormValues = {
  name: string;
  email: string;
  phone_number: string;
  age: number | undefined;
  gender: TestDriveGender | "";
  date: string;
  time: string;
  time_and_day: string;
  product: TestDriveProductId | "";
};
