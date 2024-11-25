import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="w-full h-[calc(100vh-50px)] flex items-center justify-center">
      <SignUp />
    </section>
  );
}
