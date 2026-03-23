import type { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = await getDb();
    const { page = 0, limit = 5 } = req.query;

    if (req.method === 'GET') {
      const startIndex = parseInt(page as string, 10) * parseInt(limit as string, 10);
      const endIndex = startIndex + parseInt(limit as string, 10);
      const sortedBlogs = db.data?.blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      const paginatedBlogs = sortedBlogs.slice(startIndex, endIndex) || [];
      const totalBlogs = sortedBlogs.length || 0;

      return res.status(200).json({ blogs: paginatedBlogs, total: totalBlogs });
    } else {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error handling request:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
