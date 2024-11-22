"use server";

import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const addUserToDatabase = async (
  clerkUserId: string,
  name: string,
  email: string,
  image: string
) => {
  try {
    const user = await prisma.user.upsert({
      // upsert = update + insert
      where: { clerkUserId },
      update: {
        email,
        image,
      },
      create: {
        clerkUserId,
        name,
        email,
        image,
      },
    });

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUser = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("../");
  }

  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });
  return user;
};
