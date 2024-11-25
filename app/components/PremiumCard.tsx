import { createCustomerPortal } from "@/lib/actionsStripe";
import { SignOutButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function PremiumCard() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) {
    redirect("/");
  }
  return (
    <>
      <Image
        src={user?.imageUrl as string}
        width={150}
        height={150}
        alt=""
        className="rounded-full mb-4"
        priority
      />
      <h1>Bienvenue {user?.fullName}</h1>
      <p>
        Email :{" "}
        <span className="font-semibold">
          {user?.emailAddresses[0].emailAddress}
        </span>
      </p>

      <form className="my-4" action={createCustomerPortal}>
        <button className="p-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white w-full">
          Modifier mon abonnement
        </button>
      </form>
      <div className="p-2 rounded-md bg-red-500 hover:bg-red-600 text-white mt-2">
        <SignOutButton />
      </div>
    </>
  );
}
