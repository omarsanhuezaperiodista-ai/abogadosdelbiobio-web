import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

import { getAuthCookieOptions, getJwtSecret } from '@/lib/config';
import { getDb } from '@/lib/db';

export default async function authHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = await getDb();

    switch (req.method) {
      case 'POST': {
        const email = req.body?.email?.trim()?.toLowerCase();
        const password = req.body?.password;

        if (!email || !password) {
          return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = db.data?.users.find(user => user.email === email);

        if (!user) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, getJwtSecret(), { expiresIn: '1h' });

        res.setHeader('Set-Cookie', serialize('token', token, getAuthCookieOptions(3600)));

        return res.status(200).json({ message: 'Login successful' });
      }
      case 'GET': {
        res.setHeader('Set-Cookie', serialize('token', '', getAuthCookieOptions(0)));

        return res.status(200).json({ message: 'Logged out successfully' });
      }
      default:
        res.setHeader('Allow', ['POST', 'GET']);
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.error('Error during auth process:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
