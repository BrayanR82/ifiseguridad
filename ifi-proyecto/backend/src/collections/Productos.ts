import { CollectionConfig } from 'payload'

export const Productos: CollectionConfig = {
  slug: 'productos',
  // Configuramos el acceso de lectura para que sea público
  access: {
    read: () => true,
  },
  // Configuración de la interfaz del administrador
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'precio', 'stock'],
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      required: true,
    },
    {
      name: 'precio',
      type: 'number',
      required: true,
    },
    {
      name: 'stock',
      type: 'number',
      required: true,
    },
    {
      name: 'imagen',
      type: 'upload',
      relationTo: 'media', // Asegúrate de que tu colección de imágenes se llame 'media'
      required: true,
    },
    {
      name: 'descripcion',
      type: 'richText',
    },
  ],
}