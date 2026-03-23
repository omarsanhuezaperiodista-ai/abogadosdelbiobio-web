import type { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from '@/lib/db';
import { IPostBlogEntity } from '@/interfaces/Blog';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = await getDb();

    switch (req.method) {
      case 'GET': {
        const blogs = db.data?.blogs as IPostBlogEntity[] || [];
        const sortedBlogs = blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        const latestBlogs = sortedBlogs.slice(0, 3);
        return res.status(200).json(latestBlogs);
      }
      
      default:
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error handling request:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
