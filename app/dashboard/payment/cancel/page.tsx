import Link from "next/link";

export default function CancelledPage() {
  return (
    <section className="w-full h-screen pt-20 text-center">
      <div className="w-[400px] mx-auto p-4">
        <h1 className="text-xl font-black mb-4 text-center uppercase ">
          Échec Paiement !
        </h1>
        <p className="text-muted-foreground mb-4">
          Oups, il y a eu une erreur !
        </p>
        <button className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-md">
          <Link href="/dashboard/profile">Retour à Mon compte</Link>
        </button>
      </div>
    </section>
  );
}
