import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "contact.nameLengthError",
  }),
  email: z.string().email({
    message: "contact.emailError",
  }),
  message: z.string().min(10, {
    message: "contact.messageLengthError",
  }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
