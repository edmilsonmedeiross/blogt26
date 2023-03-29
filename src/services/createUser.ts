// import  from "@/types/User";
import client from './prismadb';

export default async function createUser(infos: any) {
  client.$connect();
  const newUser = await client.users.create({
    data: {
      ...infos,
    },
    select: {
      email: true,
      name: true,
      userId: true,
      bio: true,
      password: false,
    },
  });
  client.$disconnect();
  return newUser;
}
