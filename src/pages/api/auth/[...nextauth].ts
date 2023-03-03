import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

const { BASE_URL } = process.env;

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
  
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const res = await fetch(`${BASE_URL}/api/login`, {
          method: 'POST',
          body: JSON.stringify({ email: credentials?.email, password: credentials?.password }),
          headers: { "Content-Type": "application/json;charset=UTF-8" },
        });

        const token = await res.json();

        if (res.ok && token) {
          return token;
        }

        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        delete user.data[0].password;
        token.user = user.data[0];
      }

      return token
    },
    async session(all: any) {
      const { session, token } = all;
      
      return {
        ...all,
        session: {
          ...session,
          user: token.user
        }
      };
    }
  }
}

export default NextAuth(authOptions)


