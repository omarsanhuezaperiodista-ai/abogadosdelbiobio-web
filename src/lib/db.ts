import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import fs from 'fs/promises';
import path from 'path';
import { IUserEntity } from '@/interfaces/User';
import { IPostBlogEntity } from '@/interfaces/Blog';
import { ICitasEntity } from '@/interfaces/Citas';

// Definir el path según el entorno
const isProd = process.env.NODE_ENV === 'production';
const dbFilePath = isProd
  ? path.join(process.cwd(), 'db', 'db.json') // Ruta en producción
  : path.join(process.cwd(), 'db.json'); // Ruta en desarrollo

type Data = {
  users: IUserEntity[];
  blogs: IPostBlogEntity[];
  consultas: ICitasEntity[];
};

const defaultValue = {
  users: [],
  blogs: [],
  consultas: [],
};

// Función para obtener la base de datos
export async function getDb(): Promise<Low<Data>> {
  try {
    const adapter = new JSONFile<Data>(dbFilePath);
    const db = new Low<Data>(adapter, defaultValue);

    await db.read(); // Leer la base de datos
    db.data ||= defaultValue;
    return db;
  } catch (error) {
    console.error('Error reading DB:', error);
    throw new Error('Failed to read the database');
  }
}

// Función para guardar en la base de datos
export async function saveDb(db: Low<Data>): Promise<void> {
  try {
    await fs.writeFile(dbFilePath, JSON.stringify(db.data, null, 2));
  } catch (error) {
    console.error('Error writing to the database:', error);
    throw new Error('Failed to save the database');
  }
}
