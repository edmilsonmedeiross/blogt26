import client from '@/services/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

interface PostInfosProps {
  title: string;
  thumb: string;
  slug: string;
  content: string;
  categories: string[];
  published: boolean;
  authorId: string;
  postId: string;
  modifiedAt?: Date;
  createdAt: Date;
}

async function postPosts(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { postInfos }= req.body as { postInfos: PostInfosProps };
    await client.$connect();

    const hasSlug = await client.posts.findFirst({
      where: {
        slug: postInfos.slug,
      },
    });
    if (hasSlug) {
      return res.status(400).json({ message: 'Título já existe!' });
    }

    await client.posts.create({
      data: {
        ...postInfos,
      },
    });

    return res.status(200).json({ message: 'Post criado com sucesso!' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error({ message: error.message });
      return res.status(500).json({ message: error.message });
    }
  } finally {
    await client.$disconnect();
  }
}

async function getPosts(req: NextApiRequest, res: NextApiResponse) {
  const { page = 1, limit = 10 } = req.query;
  try {
    await client.$connect();

    const posts = await client.posts.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        createdAt: true,
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
    });
    console.log('posts', posts);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error({ message: error.message });
      return res.status(500).json({ message: error.message });
    }
  } finally {
    await client.$disconnect();
  }
}


export default async function handlePosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      await getPosts(req, res);
      break;
    case 'POST':
      await postPosts(req, res);
      break;
    default:
      return res.status(405).end();
  }
}
