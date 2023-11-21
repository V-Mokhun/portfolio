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
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
	      <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Portfolio Contact Form</title>
        <meta name="description" content="Portfolio Contact Form">
        <meta name="author" content="V-Mokhun">
        <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />

      </head>
      
      <body>
        <div class="container" style="margin-left: 20px;margin-right: 20px;">
          <h1>You've got a new mail from ${name}, their email is: ✉️${email} </h1>
          <div style="font-size: 18px;">
          <p style="font-weight: 700;margin-bottom: 10px;">Message:</p>
          <p>${message}</p>
          <br>
        </div>
      </body>
      </html>`,
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
