// pages/api/blogs/[postId].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from '@/lib/db';

async function getBlog(req: NextApiRequest, res: NextApiResponse) {
  const db = await getDb();
  const { postId } = req.query;

  if (typeof postId !== 'string') {
    return res.status(400).json({ message: 'Invalid postId' });
  }

  try {
    switch (req.method) {
      case 'GET': {
        const blog = db.data?.blogs.find(blog => blog.postId === postId);
        if (!blog) {
          return res.status(404).json({ message: 'Blog not found' });
        }
        return res.status(200).json(blog);
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

export default getBlog;
