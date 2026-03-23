import { v4 as uuidv4 } from 'uuid';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';
import path from 'path';
import fs from 'fs';

import { getDb, saveDb } from '@/lib/db';
import { authMiddleware } from '@/utils/middlewares';

export const config = { api: { bodyParser: false } };
const uploadDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

function parseForm(req: NextApiRequest) {
  const form = new IncomingForm({
    uploadDir,
    keepExtensions: true,
    multiples: false,
    maxFileSize: 5 * 1024 * 1024,
  });

  return new Promise<{ fields: Record<string, string | string[] | undefined>, files: Record<string, any> }>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        fields: fields as Record<string, string | string[] | undefined>,
        files: files as Record<string, any>,
      });
    });
  });
}

async function register(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = await getDb();

    switch (req.method) {
      case 'POST': {
        const { fields, files } = await parseForm(req);

        const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
        const author = Array.isArray(fields.author) ? fields.author[0] : fields.author;
        const content = Array.isArray(fields.content) ? fields.content[0] : fields.content;
        const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;

        const image = Array.isArray(files.image) ? files.image[0] : files.image;

        if (!title || !image || !author || !content || !description) {
          return res.status(400).json({ message: 'All fields are required' });
        }

        const imageUrl = `/uploads/${path.basename(image.filepath)}`;

        const newBlog = {
          title,
          image: imageUrl,
          date: new Date().toISOString(),
          author,
          content,
          description,
          postId: uuidv4(),
        };

        db.data?.blogs.push(newBlog);
        await saveDb(db);

        return res.status(201).json(newBlog);
      }

      default:
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    if (error instanceof Error && error.name === 'FormidableError') {
      console.error('Error parsing form:', error);
      return res.status(400).json({ message: 'Error parsing form' });
    }

    console.error('Server error in /api/blogs/register:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export default authMiddleware(register);
