import { config } from "dotenv";

config({ quiet: true });

export const {
  APP_URL,

  ZOHO_MAIL_CLIENT_ID,
  ZOHO_MAIL_CLIENT_SECRET,
  ZOHO_MAIL_REFRESH_TOKEN,

  ZOHO_MAIL_ACCOUNTS_BASE,
  ZOHO_MAIL_API_BASE,
  ZOHO_MAILBOX_ADDRESS,
  ZOHO_MAIL_ACCOUNT_ID,
} = process.env;
