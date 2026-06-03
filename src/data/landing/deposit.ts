import type {
  DepositCopy,
  DepositFormField,
  DepositPersonalInfo,
  DepositStep,
} from "@/types/landing/deposit";

export const depositSteps: DepositStep[] = [
  { id: "choose-bike", label: "اختر الدراجة" },
  { id: "enter-details", label: "أدخل بياناتك" },
  { id: "review-order", label: "راجع الطلب" },
  { id: "pay-deposit", label: "ادفع العربون" },
  { id: "booking-confirmed", label: "تأكيد الحجز" },
];

export const depositDefaultPersonalInfo: DepositPersonalInfo = {
  fullName: "",
  phone: "",
  email: "",
  city: "",
  notes: "",
};

export const depositPersonalFields: DepositFormField[] = [
  {
    id: "fullName",
    label: "الاسم الكامل",
    placeholder: "أدخل اسمك الكامل",
    type: "text",
    required: true,
    icon: "user",
  },
  {
    id: "phone",
    label: "رقم الجوال",
    placeholder: "+966 5X XXX XXXX",
    type: "tel",
    required: true,
    icon: "phone",
  },
  {
    id: "email",
    label: "البريد الإلكتروني",
    placeholder: "example@email.com",
    type: "email",
    required: true,
    icon: "mail",
  },
  {
    id: "city",
    label: "المدينة",
    placeholder: "مثال: الرياض",
    type: "text",
    required: true,
    icon: "map-pin",
  },
  {
    id: "notes",
    label: "ملاحظات (اختياري)",
    placeholder: "أي ملاحظات إضافية...",
    type: "textarea",
    required: false,
    icon: "message-square",
  },
];

export const depositCopy: DepositCopy = {
  details: {
    title: "معلوماتك",
    highlight: "الشخصية",
    description: "أدخل بياناتك لإتمام حجز دراجتك",
    submitLabel: "متابعة إلى المراجعة",
  },
  review: {
    title: "مراجعة طلب",
    highlight: "الحجز",
    description: "تأكد من صحة جميع البيانات قبل المتابعة للدفع",
    submitLabel: "تأكيد والمتابعة للدفع",
    editLabel: "تعديل البيانات",
  },
};
