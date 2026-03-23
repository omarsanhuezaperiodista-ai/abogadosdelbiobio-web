import type { NextApiRequest, NextApiResponse } from 'next';
import { getDb, saveDb } from '@/lib/db';
import formidable, { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import { authMiddleware } from '@/utils/middlewares';

export const config = {
  api: {
    bodyParser: false, // Usar formidable para analizar form-data
  },
};

const uploadDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

function parseForm(req: NextApiRequest) {
  const form = new IncomingForm({
    uploadDir,
    keepExtensions: true,
    multiples: false,
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

async function editDeleteBlog(req: NextApiRequest, res: NextApiResponse) {
  const db = await getDb();
  const { postId } = req.query;

  if (typeof postId !== 'string') {
    return res.status(400).json({ message: 'Invalid postId' });
  }

  try {
    switch (req.method) {
      case 'PUT': {
        const { fields, files } = await parseForm(req);

        const blogIndexEdit = db.data?.blogs.findIndex((blog) => blog.postId === postId);
        if (blogIndexEdit === -1 || blogIndexEdit === undefined) {
          return res.status(404).json({ message: 'Blog not found' });
        }

        const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
        const author = Array.isArray(fields.author) ? fields.author[0] : fields.author;
        const content = Array.isArray(fields.content) ? fields.content[0] : fields.content;
        const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;

        const updatedBlog = {
          title: title as string,
          description: description as string,
          content: content as string,
          author: author as string,
          image: db.data!.blogs[blogIndexEdit].image,
          date: db.data!.blogs[blogIndexEdit].date,
          postId: db.data!.blogs[blogIndexEdit].postId,
        };

        if (files.image) {
          const image = Array.isArray(files.image) ? files.image[0] : files.image;
          updatedBlog.image = `/uploads/${path.basename(image.filepath)}`;
        }

        db.data!.blogs[blogIndexEdit] = { ...db.data!.blogs[blogIndexEdit], ...updatedBlog };
        await saveDb(db);

        return res.status(200).json(db.data!.blogs[blogIndexEdit]);
      }

      case 'DELETE': {
        const blogIndexDelete = db.data?.blogs.findIndex((blog) => blog.postId === postId);
        if (blogIndexDelete === -1 || blogIndexDelete === undefined) {
          return res.status(404).json({ message: 'Blog not found' });
        }

        db.data!.blogs.splice(blogIndexDelete, 1);
        await saveDb(db); 

        return res.status(204).end();
      }

      default:
        res.setHeader('Allow', ['PUT', 'DELETE']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    if (error instanceof Error && error.name === 'FormidableError') {
      console.error('Error parsing form:', error);
      return res.status(400).json({ message: 'Error parsing form' });
    }

    console.error('Error handling request:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export default authMiddleware(editDeleteBlog);
