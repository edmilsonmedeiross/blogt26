import client from '@/services/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handleSlug(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { slug },
  } = req;

  if (typeof slug !== 'string') {
    return res.status(400).json({ error: 'Slug inválido' });
  }
// wszwxxxe
  try {
    await client.$connect();
    const post = await client.posts.findUnique({ where: { slug } });
    console.log(post);
    
    return res.status(200).json({ post });
  } catch (error) {
    return res.status(400).json({ error: 'Slug inválido' });
  } finally {
    await client.$disconnect();
  }
}
