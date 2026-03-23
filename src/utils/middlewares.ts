import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import jwt from 'jsonwebtoken';
import { getJwtSecret } from '@/lib/config';

interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    id: string;
    email: string;
  };
}

export const authMiddleware = (handler: NextApiHandler) => async (req: AuthenticatedRequest, res: NextApiResponse) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  try {
    const decoded = jwt.verify(token, getJwtSecret());
    req.user = decoded as { id: string; email: string };
    return handler(req, res);
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
