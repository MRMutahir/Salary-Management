import { MailtrapClient } from "mailtrap";
import { envKeys } from "../config/keys.js";

const TOKEN = envKeys.MAILTRAP_TOKEN;
const ENDPOINT = envKeys.MAILTRAP_ENDPOINT;

const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

const sendEmail = async (
  recipientsEmail,
  EmailObject,
  EmailData,
  EmailCategory
) => {
  const sender = {
    email: "mailtrap@demomailtrap.com",
    name: "Muhammad Mutahir",
  };
  const recipients = [
    {
      email: "mutahirkareem820@gmail.com",
    },
  ];

  try {
    await client.send({
      from: sender,
      to: recipients,
      subject: EmailObject,
      text: EmailData,
      category: EmailCategory,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export { sendEmail };
