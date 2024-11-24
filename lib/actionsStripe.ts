"use server";

import { prisma } from "@/lib/db";
import { getStripeSession, stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { getUser } from "./actionsUsers";

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
      clerkUserId: user.clerkUserId as string,
    },
    select: {
      stripeCustomerId: true,
    },
  });

  if (!dbUser?.stripeCustomerId) {
    throw new Error("User doesn't have a Stripe customer ID not found");
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
