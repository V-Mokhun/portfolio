import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
  Toaster,
  useToast,
} from "@/ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
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
          className="bg-card shadow-md px-4 py-6 rounded-lg space-y-6 max-w-lg mx-auto"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("contact.name")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={
                      t("contact.namePlaceholder") ?? "Enter your name"
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage data-testid="contact-name-error" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("contact.email")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={
                      t("contact.emailPlaceholder") ?? "Enter your email"
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage data-testid="contact-email-error" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("contact.message")}</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none min-h-[120px]"
                    placeholder={
                      t("contact.messagePlaceholder") ?? "Enter your message"
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage data-testid="contact-message-error" />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button
              disabled={isLoading}
              className="uppercase text-sm rounded-sm transition-all duration-300"
              variant="ghost"
              type="submit"
            >
              {t("contact.sendMessage")}
            </Button>
          </div>
        </form>
      </Form>
      <Toaster />
    </>
  );
};
