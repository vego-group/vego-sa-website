"use client";

import { useLocale, useTranslations } from "next-intl";

import type { TestDriveCopy, TestDrivePageContent } from "@/interfaces";
import type {
  TestDriveBenefit,
  TestDriveLocale,
  TestDriveMetric,
  TestDriveProductOption,
} from "@/types";

import TestDriveBenefits from "./TestDriveBenefits";
import TestDriveForm from "./TestDriveForm";
import TestDriveHero from "./TestDriveHero";

function TestDrive() {
  const locale = useLocale();
  const currentLocale: TestDriveLocale = locale === "ar" ? "ar" : "en";
  const t = useTranslations("test-drive");

  const copy: TestDriveCopy = {
    badge: t("badge"),
    title: t("title"),
    description: t("description"),
    heroNote: t("heroNote"),
    statsLabel: t("statsLabel"),
    benefitsTitle: t("benefitsTitle"),
    benefitsDescription: t("benefitsDescription"),
    formBadge: t("formBadge"),
    formTitle: t("formTitle"),
    formDescription: t("formDescription"),
    productPlaceholder: t("productPlaceholder"),
    genderPlaceholder: t("genderPlaceholder"),
    quickNoteTitle: t("quickNoteTitle"),
    quickNoteDescription: t("quickNoteDescription"),
    phoneCountryCode: t("phoneCountryCode"),
    phoneFlagAlt: t("phoneFlagAlt"),
    submit: t("submit"),
    submitting: t("submitting"),
    successMessage: t("successMessage"),
    placeholders: {
      name: t("placeholders.name"),
      email: t("placeholders.email"),
      phone: t("placeholders.phone"),
      phoneExample: t("placeholders.phoneExample"),
      age: t("placeholders.age"),
      date: t("placeholders.date"),
      time: t("placeholders.time"),
    },
    labels: {
      name: t("labels.name"),
      email: t("labels.email"),
      phone: t("labels.phone"),
      age: t("labels.age"),
      gender: t("labels.gender"),
      date: t("labels.date"),
      time: t("labels.time"),
      product: t("labels.product"),
    },
    genders: {
      male: t("genders.male"),
      female: t("genders.female"),
    },
    validation: {
      required: t("validation.required"),
      email: t("validation.email"),
      phone: t("validation.phone"),
      age: t("validation.age"),
    },
  };

  const pageContent: TestDrivePageContent = {
    copy,
    metrics: t.raw("metrics") as TestDriveMetric[],
    benefits: t.raw("benefits") as TestDriveBenefit[],
    products: t.raw("products") as TestDriveProductOption[],
  };

  return (
    <div className="overflow-x-clip bg-[linear-gradient(180deg,_#f8fafc_0%,_#ffffff_24%,_#f8fafc_100%)]">
      <TestDriveHero
        copy={pageContent.copy}
        metrics={pageContent.metrics}
        locale={currentLocale}
      />
      <TestDriveBenefits
        copy={pageContent.copy}
        benefits={pageContent.benefits}
        locale={currentLocale}
      />
      <TestDriveForm
        copy={pageContent.copy}
        products={pageContent.products}
        locale={currentLocale}
      />
    </div>
  );
}

export default TestDrive;
