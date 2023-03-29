// import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import client from './prismadb';
import User from '@/types/User';

type ParanProps = {
  email: string;
  password?: string;
};

export default async function searchUser(paran: ParanProps): Promise<User | null | unknown> {
  console.log('paran', paran);

  try {
    await client.$connect();
    const { email, password } = paran;

    const user = await client?.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    if (user?.password && password) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return null;
      }

      user.password = '';
    }

    return user;
  } catch (err) {
    console.log(err);
    return err;
  } finally {
    await client?.$disconnect();
  }
}
