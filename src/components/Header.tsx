import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Session } from "next-auth";
import { useSession, SessionContextValue } from "next-auth/react";
import Link from "next/link"
import { ReactNode } from "react";

function Header() {
  const { data: { session } }: any  = useSession();
  const admin: any = session?.user?.admin;

  return (
    <>
    <nav>
      <Link href="/login">Login</Link>
      {admin && <Link href="/create-posts">Administração</Link>}
    </nav>
    </>
  )
}

export default Header

