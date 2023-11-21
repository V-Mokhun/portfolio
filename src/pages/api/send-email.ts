import sendgrid from "@sendgrid/mail";

import { isEmail } from "@/lib";
import type { APIRoute } from "astro";

sendgrid.setApiKey(import.meta.env.SENDGRID_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");

  if (!name || !email || !isEmail(email.toString()) || !message) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
				success: false,
      }),
      { status: 400 }
    );
  }

  try {
    await sendgrid.send({
      to: import.meta.env.EMAIL_TO_RECEIPIENT,
      from: import.meta.env.EMAIL_FROM_RECEIPIENT,
      subject: "New message from portfolio website",
      html: `<div><p>Name: ${name}, email: ${email}</p><p>${message}</p></div>`,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Something went wrong",
        success: false,
      }),
      { status: 500 }
    );
  }

  return new Response(
    JSON.stringify({
      message: "Success!",
      success: true,
    }),
    { status: 200 }
  );
};
