import client from '@/services/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        await client.$connect();
        const categories = await client.categories.findMany({
          select: {
            categoryId: false,
            categoryName: true,
          },
        });
        return res.status(200).json({ categories });
      } catch (err) {
        if (err instanceof Error) {
          return res.status(400).json({ message: err.message });
        }
      } finally {
        await client.$disconnect();
      }
      break;
    case 'POST':
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
