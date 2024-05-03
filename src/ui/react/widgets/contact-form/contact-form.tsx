import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  RippleButton,
  Textarea,
  Toaster,
  useToast,
} from "@/ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { contactFormSchema, type ContactFormValues } from "./model";

interface ContactFormProps {}

export const ContactForm = ({}: ContactFormProps) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("message", values.message);

      const response = await fetch("/api/send-email", {
        method: "POST",
        body: formData,
      });
      const data: { message: string; success: boolean } = await response.json();
      if (data.success) {
        toast({
          title:
            t("contact.successMessageTitle") ??
            "Your message has been sent successfully!",
          description:
            t("contact.successMessageDescription") ??
            "I will get back to you as soon as possible.",
          variant: "success",
        });
        form.reset();
      } else {
        toast({
          title:
            data.message ??
            t("contact.errorMessageTitle") ??
            "Something went wrong...",
          description:
            t("contact.errorMessageDescription") ?? "Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: t("contact.errorMessageTitle") ?? "Something went wrong...",
        description:
          t("contact.errorMessageDescription") ?? "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-lg mx-auto text-left"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={t("contact.name") ?? "Enter your name"}
                    {...field}
                  />
                </FormControl>
                <FormLabel>{t("contact.name")}</FormLabel>
                <FormMessage data-testid="contact-name-error" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={t("contact.email") ?? "Enter your email"}
                    {...field}
                  />
                </FormControl>
                <FormLabel>{t("contact.email")}</FormLabel>
                <FormMessage data-testid="contact-email-error" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    className="resize-none min-h-[100px]"
                    placeholder={t("contact.message") ?? "Enter your message"}
                    {...field}
                  />
                </FormControl>
                <FormLabel>{t("contact.message")}</FormLabel>
                <FormMessage data-testid="contact-message-error" />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <RippleButton disabled={isLoading} size="lg" type="submit">
              {t("contact.sendMessage")}
            </RippleButton>
          </div>
        </form>
      </Form>
      <Toaster />
    </>
  );
};
