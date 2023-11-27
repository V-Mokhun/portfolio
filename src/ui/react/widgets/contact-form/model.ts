import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Your name must be at least 2 characters long.",
  }),
  email: z.string().email({ message: "Your email address is invalid." }),
  message: z
    .string()
    .min(10, { message: "Your message must be at least 10 characters long." }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
