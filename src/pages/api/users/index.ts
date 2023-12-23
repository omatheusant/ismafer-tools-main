import { NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: Request, res: NextApiResponse) {
  if(req.method !== "GET") {
    res.status(400).send('BAD REQUEST')
  }

  const users = await prisma.user.findMany();

  return res.send(users)
}