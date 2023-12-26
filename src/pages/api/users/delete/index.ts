import { NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: any, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(400).send('BAD REQUEST')
  }
  const body = req.body

  const deleteUser = await prisma?.user.delete({
    where: {
      username: body.username
    }
  })
  res.send(deleteUser)
}