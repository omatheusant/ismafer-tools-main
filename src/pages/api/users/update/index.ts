import { UserBody } from '@/types/users';
import { NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

interface AtualUser extends UserBody {
  atualUser: string
}

export default async function handler(req: any, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(400).send('BAD REQUEST')
  };

  const user = await req.body as AtualUser

  const updateUser = await prisma?.user.update({
    where: {
      username: user.atualUser
    },
    data: {
      name: user.name,
      username: user.username,
      role: user.role
    }
  })

  res.send(updateUser) 
}