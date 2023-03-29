import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth, { AuthOptions } from 'next-auth';
import axios from 'axios';
import User from '@/types/User';

const { NEXTAUTH_URL } = process.env;

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { data } = await axios.post<User>(`${NEXTAUTH_URL as string}/api/login`, {
            email: credentials?.email,
            password: credentials?.password,
        });
        console.log('AUTH ====>', data);
        
        if (data) {
          return { ...data, id: data.userId };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt(all) {
      const { token, user } = all;

      if (user?.password === '') {
        delete user.password;
        return {  ...token, user };
      }

      return token;
    },
    session(all) {
      const { session, token } = all;

      return {
        ...session,
        user: token.user,
      };
    },
  },
};

export default NextAuth(authOptions);
