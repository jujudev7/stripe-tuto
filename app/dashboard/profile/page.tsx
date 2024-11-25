import MemberCard from "@/app/components/MemberCard";
import PremiumCard from "@/app/components/PremiumCard";
import { getDataStripeUser } from "@/lib/actionsStripe";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function PageDashboard() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const dataStripe = await getDataStripeUser(userId as string);

  return (
    <section className="relative w-full h-[calc(100vh-50px)] flex items-center justify-center flex-col">
      <h1 className="absolute text-center font-bold text-2xl top-4">
        Mon compte
      </h1>
      {dataStripe?.status === "active" ? <PremiumCard /> : <MemberCard />}
    </section>
  );
}
