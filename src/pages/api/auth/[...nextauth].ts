import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import client from "@/services/prismadb";

const { NEXTAUTH_URL } = process.env;


export const authOptions: AuthOptions = {
  // adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
  
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials, req) {   
        const res: any = await fetch(`${NEXTAUTH_URL}/api/login`, {
          method: 'POST',
          body: JSON.stringify({ email: credentials?.email, password: credentials?.password }),
          headers: { "Content-Type": "application/json;charset=UTF-8" },
        });

        const {data} = await res.json();

        if (res.ok && data) {
          return data;
        }

        return null
      }
    })
  ],
  callbacks: {
    async jwt(all: any) {
      const {token, user} = all
      console.log('token', token);
      console.log('user', user);
      
      if (user?.password === '') {
        delete user?.password;
        token.user = user;
      }

      return token
    },
    async session(all: any) {
      const { session, token } = all;
      console.log('session===>', all);
      
      
      return {
          ...session,
          user: token.user,
      };
    }
  }
}

export default NextAuth(authOptions)


