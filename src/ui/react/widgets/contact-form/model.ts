import { z } from "zod";
import { t } from "i18next";

export const contactFormSchema = z.object({
  name: z.string().min(2, {
    message:
      t("contact.nameLengthError") ??
      "Your name must be at least 2 characters long.",
  }),
  email: z
    .string()
    .email({
      message: t("contact.emailError") ?? "Your email address is invalid.",
    }),
  message: z.string().min(10, {
    message:
      t("contact.messageLengthError") ??
      "Your message must be at least 10 characters long.",
  }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
