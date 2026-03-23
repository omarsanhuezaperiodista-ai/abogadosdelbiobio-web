import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import type { NextApiRequest, NextApiResponse } from 'next';

import { authMiddleware } from '@/utils/middlewares';
import { IUserEntity } from '@/interfaces/User';
import { getDb, saveDb } from '@/lib/db';

async function register(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = await getDb();

    switch (req.method) {
      case 'POST':
        const name = req.body?.name?.trim();
        const email = req.body?.email?.trim()?.toLowerCase();
        const password = req.body?.password;

        if (!name || !email || !password) {
          return res.status(400).json({ message: 'Name, email, and password are required' });
        }

        const existingUser = db.data?.users.find(user => user.email === email);
        if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser: IUserEntity = {
          id: uuidv4(),
          name,
          email,
          password: hashedPassword,
        };

        // Guardar el nuevo usuario en la base de datos
        db.data?.users.push(newUser);
        await saveDb(db); 

        return res.status(201).json({ message: 'User registered successfully' });

      default:
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.error('Error during registration process:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export default authMiddleware(register);
