import { addUserToDatabase } from "@/lib/actionsUsers";
import React from "react";
// import { prisma } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  const user = await currentUser();

  if (!user || !userId) {
    redirect("/sign-in");
  } else {
    const fullName = `${user.firstName} ${user.lastName}` || "";
    const email = user.emailAddresses[0].emailAddress || "";
    const image = user.imageUrl || "";

    await addUserToDatabase(userId, fullName, email, image);
  }

  return (
    <section className="max-w-[1200px] w-full mx-auto mt-2 p-2">
      {children}
    </section>
  );
}
