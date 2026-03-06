import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'

// 1. Importa tus nuevas colecciones (las crearemos a continuación)

// import { Servicios } from './collections/Servicios'
import { Servicios } from './collections/Servicios'

// import { Productos } from './collections/Productos'
import { Productos } from './collections/Productos'

// ... otras importaciones
import { Contactos } from './collections/Contactos'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({

  serverURL: 'http://localhost:3000',

  admin: {

    user: Users.slug,

    importMap: {

      baseDir: path.resolve(dirname),

    },

  },

  // 2. Añade las colecciones al array para que aparezcan en el panel admin
  collections: [Users, Media, Servicios, Productos, Contactos],

 

  // 3. CONFIGURACIÓN CRÍTICA PARA TU FRONTEND:
  // Esto permite que tu index.html (desde Live Server o un dominio)
  // pueda pedirle datos al backend sin ser bloqueado.

  cors: [

    'http://localhost:5500',
    'http://127.0.0.1:5500',
    'http://localhost:3001', // <--- AÑADE ESTE
    'http://127.0.0.1:3001', // <--- Y ESTE POR SI ACASO
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:8080',

  ],


  // 4. CSRF (Opcional pero recomendado):
  // Protege el panel administrativo de ataques desde otros dominios.

  csrf: [

    'http://localhost:5500',
    'http://127.0.0.1:5500',
    'http://localhost:3001', // <--- TAMBIÉN AQUÍ
    'http://127.0.0.1:3001',
    'http://127.0.0.1:3000', 
    'http://localhost:8080',

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

  plugins: [],

})