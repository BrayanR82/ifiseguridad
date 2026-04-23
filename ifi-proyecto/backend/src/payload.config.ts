import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// IMPORTACIONES PARA CLOUDINARY
import { cloudStorage } from '@payloadcms/plugin-cloud-storage'
import { cloudinaryAdapter } from '@payloadcms/plugin-cloud-storage/adapters/cloudinary'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Servicios } from './collections/Servicios'
import { Productos } from './collections/Productos'
import { Contactos } from './collections/Contactos'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // Eliminamos el serverURL fijo para que funcione en cualquier dominio (Vercel o Local)
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  collections: [Users, Media, Servicios, Productos, Contactos],

  // Mantengo tus CORS pero simplificados para producción
  cors: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://ifiseguridad.vercel.app',
    'https://ifiseguridad-kmp4m9bzv-brayanr82s-projects.vercel.app',
    '*', // Esto ayuda a evitar bloqueos durante pruebas
  ],

  csrf: [
    'https://ifiseguridad.vercel.app',
    'https://ifiseguridad-kmp4m9bzv-brayanr82s-projects.vercel.app'
  ],

  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),

  sharp,

  plugins: [
    cloudStorage({
      collections: {
        // "media" debe ser el slug de tu colección de imágenes
        'media': {
          adapter: cloudinaryAdapter({
            config: {
              cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
              api_key: process.env.CLOUDINARY_API_KEY,
              api_secret: process.env.CLOUDINARY_API_SECRET,
            },
          }),
        },
      },
    }),
  ],
})