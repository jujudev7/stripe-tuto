import { createSubscription } from "@/lib/actionsStripe";
import { SignOutButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function MemberCard() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) {
    redirect("/");
  }
  return (
    <section className="w-full h-screen flex items-center justify-center flex-col">
      <Image
        src={user?.imageUrl as string}
        width={150}
        height={150}
        alt=""
        className="rounded-full mb-2"
        priority
      />
      <h1>Bienvenue {user?.fullName}</h1>
      <p>Email : {user?.emailAddresses[0].emailAddress}</p>

      <form className="my-4" action={createSubscription}>
        <button className="p-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white w-full">
          Devenir membre Premium
        </button>
      </form>

      <div className="p-2 rounded-md bg-red-500 hover:bg-red-600 text-white">
        <SignOutButton />
      </div>
    </section>
  );
}
