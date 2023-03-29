import MyUser from '@/types/User';
// import NextAuth from 'next-auth';

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: MyUser | unknown;
	}


  interface User extends MyUser {
    userId: string;
  }
}
