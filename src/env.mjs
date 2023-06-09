import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"]),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string().min(1)
        : z.string().min(1).optional(),
    // Add `.min(1) on ID and SECRET if you want to make sure they're not empty
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    DALLE_API_KEY: z.string(),
    MOCK_DALLE: z.string(),
    SECRET_ACCESS_KEY: z.string(),
    ACCESS_KEY_ID: z.string(),
    STRIPE_SECRET_KEY: z.string(),
    PRICE_ID: z.string(),
    STRIPE_WEB_HOOK_SECRET: z.string(),
    HOST_NAME: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_STRIPE_KEY: z.string(),
    // NEXT_PUBLIC_CLIENTVAR: z.string().min(1),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    DALLE_API_KEY: process.env.DALLE_API_KEY,
    MOCK_DALLE: process.env.MOCK_DALLE,
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
    ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
    NEXT_PUBLIC_STRIPE_KEY: process.env.NEXT_PUBLIC_STRIPE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    PRICE_ID: process.env.PRICE_ID,
    STRIPE_WEB_HOOK_SECRET: process.env.STRIPE_WEB_HOOK_SECRET,
    HOST_NAME: process.env.HOST_NAME,
  },
});
