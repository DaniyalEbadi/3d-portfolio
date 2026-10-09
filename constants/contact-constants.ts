import {
  type ContactField,
  type ContactFormData,
} from "@/types/contact-types";

export const INITIAL_FORM_STATE: ContactFormData = {
  name: "",
  email: "",
  budget: "",
  message: "",
};

export const REQUIRED_FIELDS: ContactField[] = ["name", "email", "message"];

export const BUDGET_OPTIONS = [
  { value: "< $1k", label: "کمتر از ۱٬۰۰۰ دلار" },
  { value: "$1k - $5k", label: "۱٬۰۰۰ تا ۵٬۰۰۰ دلار" },
  { value: "$5k - $15k", label: "۵٬۰۰۰ تا ۱۵٬۰۰۰ دلار" },
  { value: "$15k+", label: "بیش از ۱۵٬۰۰۰ دلار" },
  { value: "hourly", label: "ساعتی" },
] as const;

export const ALERT_DURATION = 5000;

export const CONTACT_SUCCESS_MESSAGE =
  "پیام شما ارسال شد. حداکثر تا ۲۴ ساعت دیگر پاسخ می‌دهم.";
export const CONTACT_ERROR_MESSAGE =
  "مشکلی پیش آمد، لطفاً دوباره تلاش کنید.";
