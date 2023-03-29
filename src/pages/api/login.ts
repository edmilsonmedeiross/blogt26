import { NextApiRequest, NextApiResponse } from 'next';
import searchUser from '../../services/searchUser';

interface reqBody {
  email: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body as reqBody;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email and/or password' });
  }

  const data = { email, password };

  const verify = await searchUser(data);

  if (verify) {
    return res.status(200).json({ data: verify });
  }

  res.status(400).json({ error: 'Invalid email and/or password' });
}
