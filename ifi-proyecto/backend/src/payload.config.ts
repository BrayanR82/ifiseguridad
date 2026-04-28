import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Servicios } from './collections/Servicios'
import { Productos } from './collections/Productos'
import { Galeria } from './collections/Galeria'
import { Contactos } from './collections/Contactos'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Servicios, Productos, Galeria, Contactos],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'temp-secret',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  cors: [
    'https://ifiseguridad.vercel.app',
    'https://ifiseguridad-brayanr82s-projects.vercel.app', // <--- ESTA ES LA QUE FALTA
    'http://localhost:3000',
    'http://localhost:5500',
    'http://127.0.0.1:5500',
    'https://ifiseguridad-git-main-brayanr82s-projects.vercel.app',
    'https://ifiseguridad-i6plgy00t-brayanr82s-projects.vercel.app',
  ],

  csrf: [
    'https://ifiseguridad.vercel.app',
    'https://ifiseguridad-brayanr82s-projects.vercel.app', // <--- TAMBIÉN AQUÍ
    'http://localhost:3000',
    'http://localhost:5500',
    'https://ifiseguridad-git-main-brayanr82s-projects.vercel.app',
    'https://ifiseguridad-i6plgy00t-brayanr82s-projects.vercel.app',
  ],
  
  plugins: [], // <--- Vaciamos los plugins
})