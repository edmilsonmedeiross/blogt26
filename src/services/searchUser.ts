// import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import client from './prismadb';

// const prisma = new PrismaClient();

type ParanProps = {
  email: string;
  password: string;
};


export default async function searchUser(paran: ParanProps) {

  console.log('paran', paran);
  

  try {
    const { email, password } = paran;

    const user = await client?.users.findUnique({
      where: {
        email,
      }
    });

    if (!user) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return null;
    }

    user.password = '';
    client?.$disconnect();

    return user;
  } catch (err) {
    console.log(err);
    return err;
  }
}