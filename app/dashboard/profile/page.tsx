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
    <>
      <h1 className="text-center font-bold text-2xl mt-4">Mon compte</h1>
      {dataStripe?.status === "active" ? <PremiumCard /> : <MemberCard />}
    </>
  );
}
