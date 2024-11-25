import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className="w-full h-[50px] p-2 flex items-center justify-between border-b">
      <div className="flex items-center gap-2 text-sm ml-4">
        <Link href="/" className="hover:font-bold">
          Accueil
        </Link>
        {/* <Link href="/sign-in">SignIn</Link>
        <Link href="/sign-up">SignUp</Link> */}
      </div>
      <div className="mr-4">
        {/* Bouton pour les utilisateurs non connectés */}
        <SignedOut>
          <SignInButton className="bg-slate-700 text-white rounded-lg px-3 py-1 hover:bg-slate-900">
            Connexion
          </SignInButton>
        </SignedOut>

        {/* Bouton pour les utilisateurs connectés */}
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
