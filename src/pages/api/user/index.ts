import searchUser from '@/services/searchUser';
import { NextApiRequest, NextApiResponse } from 'next';
import createUser from '@/services/createUser';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import User from '@/types/User';

export default async function handleUser(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
  const { name, email, password } = req.body as User;
  const verify = await searchUser({ email });
  switch (req.method) {
  case 'POST':
    if (verify) {
      return res.status(409).json({ message: 'Email já cadastrado' });
    }

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Preencha todos os campos' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Senha deve ter no mínimo 6 caracteres' });
    }

    if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'Algum campo inválido' });
    }

    try {
      const encriptPSW = await bcrypt.hash(password, 10);
      const newUser = await createUser({
        name,
        email,
        password: encriptPSW,
        userId: v4(),
      });
      return res.status(201).json(newUser);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
        return res.status(500).json({ message: 'Erro interno', error: err });
      }
    }
    break;
  }
}
