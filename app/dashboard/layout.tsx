import { addUserToDatabase, getUser } from "@/lib/actionsUsers";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  const user = await currentUser();

  const userDb = await getUser();

  if (!user || !userId) {
    redirect("/");
  } else {
    const fullName = `${user.firstName} + " " + ${user.lastName}` || "";
    const email = user.emailAddresses[0]?.emailAddress || "";
    const image = user.imageUrl || "";

    await addUserToDatabase(userId, fullName, email, image);
  }

  if (!userDb?.stripeCustomerId) {
    const stripeCustomer = await stripe.customers.create({
      email: userDb?.email as string,
    });

    await prisma.user.update({
      where: { clerkUserId: userId },
      data: {
        stripeCustomerId: stripeCustomer.id as string,
      },
    });
  }

  return (
    <section className="max-w-[1200px] w-full mx-auto">
      <div className="w-full h-full">{children}</div>
    </section>
  );
}
