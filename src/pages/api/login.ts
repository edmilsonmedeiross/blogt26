import { NextApiRequest, NextApiResponse } from "next";
import searchUser from "../../services/user";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing email and/or password" });
  }

  const data = { email, password }
  
  const verify = await searchUser(data);


  if(verify.length) { 
    res.status(200).json({ data: verify });
    return;
  }

  res.status(400).json({ error: "Invalid email and/or password" });
}
