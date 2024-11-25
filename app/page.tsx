import Image from "next/image";

export default function Home() {
  return (
    <section className="w-full h-[calc(100vh-200px)] flex flex-col items-center justify-center">
      <h1 className="text-5xl font-black uppercase mb-8">STRIPE NEXT JS 15</h1>
      <Image
        src="/stripe-logo.png"
        alt="logo Stripe"
        width="400"
        height="225"
        priority
      />
    </section>
  );
}

