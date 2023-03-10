import { NextApiRequest, NextApiResponse } from 'next'

export default function handlePosts(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.method);
  
  res.status(200).json({ name: 'John Doe' });
}