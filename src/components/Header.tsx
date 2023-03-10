import { useSession } from "next-auth/react";
import Link from "next/link"

function Header() {
  const userSession = useSession();

  let admin: boolean = false;

  if (userSession.data) {
    const { data: { session } }: any = userSession;
    admin = session?.user?.admin; 
  }

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

