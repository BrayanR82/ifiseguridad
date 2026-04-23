import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// IMPORTACIONES PLUGINS
import { cloudStorage } from '@payloadcms/plugin-cloud-storage'
import { cloudinaryAdapter } from '@payloadcms/plugin-cloud-storage/cloudinary'

// COLECCIONES
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Servicios } from './collections/Servicios'
import { Productos } from './collections/Productos'
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
  collections: [Users, Media, Servicios, Productos, Contactos],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'ESTO_ES_UN_SECRET_TEMPORAL',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  cors: ['https://ifiseguridad.vercel.app', 'http://localhost:3000', '*'],
  csrf: ['https://ifiseguridad.vercel.app'],
  plugins: [
    cloudStorage({
      collections: {
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