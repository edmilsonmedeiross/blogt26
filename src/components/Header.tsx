import { UserObj, Roles } from '@/types/User';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface Data {
  data: UserObj | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
}

function Header() {
  const userSession = useSession() as Data;
  console.log(userSession);

  let role: Roles = 'user';
  if (userSession.data) {
    const { data: { user } } = userSession;
    role = user?.role; 
  }

  return (
    <>
    <nav className="ck-head">
      <Link href="/login">Login</Link>
      {
        role === 'admin'
          && <Link href="/create-posts">Administração</Link>
      }
    </nav>
    </>
  );
}

export default Header;

