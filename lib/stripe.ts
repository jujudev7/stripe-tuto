import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_KEY_SECRET as string, {
  typescript: true,
});
