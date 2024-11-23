import { redirect } from "next/navigation";
import { getUser } from "./actionsUsers";
import { prisma } from "./db";
import { stripe } from "./stripe";

export const getStripeSession = async ({
  priceId,
  domainUrl,
  customerId,
}: {
  priceId: string;
  domainUrl: string;
  customerId: string;
}) => {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    billing_address_collection: "auto",
    line_items: [{ price: priceId, quantity: 1 }],
    payment_method_types: ["card"],
    customer_update: {
      address: "auto",
      name: "auto",
    },
    success_url: `${domainUrl}/dashboard/payment/success}`,
    cancel_url: `${domainUrl}/dashboard/payment/cancel}`,
  });

  return session.url as string;
};

export const getDataStripeUser = async (userId: string) => {
  const data = await prisma.subscription.findUnique({
    where: {
      userId: userId,
    },
    select: {
      status: true,
      user: {
        select: {
          stripeCustomerId: true,
        },
      },
    },
  });
  return data;
};

export const createSubscription = async () => {
  const user = await getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      clerkUserId: user?.clerkUserId as string,
    },
    select: {
      stripeCustomerId: true,
    },
  });

  if (!dbUser?.stripeCustomerId) {
    throw new Error("Stripe customer ID not found");
  }

  const subscriptionUrl = await getStripeSession({
    customerId: dbUser.stripeCustomerId,
    domainUrl: "http://localhost:3000",
    priceId: process.env.STRIPE_API_ID as string,
  });

  return redirect(subscriptionUrl);
};

export const createCustomerPortal = async () => {
  const user = await getUser();

  const session = await stripe.billingPortal.sessions.create({
    customer: user?.stripeCustomerId as string,
    return_url: "http://localhost:3000/dashboard/profile",
  });

  return redirect(session.url);
};
