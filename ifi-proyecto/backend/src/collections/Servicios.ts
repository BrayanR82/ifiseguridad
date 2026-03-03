import type { CollectionConfig } from 'payload'

export const Servicios: CollectionConfig = {
  slug: 'servicios',
  admin: {
    useAsTitle: 'titulo',
  },
  // CAMBIA ESTO:
  access: {
    read: () => true,   // Cualquiera puede verlos
    create: () => true, // Permite crear (esto quita el error que tienes)
    update: () => true, // Permite editar
    delete: () => true, // Permite borrar
  },
  fields: [
    {
      name: 'titulo',
      type: 'text',
      required: true,
    },
    {
      name: 'imagen', // Campo para la foto
      type: 'upload',
      relationTo: 'media', // Se conecta con la carpeta de fotos
      required: true,
    },
    {
      name: 'resumen', // Una descripción corta para la tarjeta
      type: 'textarea',
      required: true,
    },
    {
      name: 'detalles', // Aquí puedes poner TODA la información extra
      type: 'richText', // Esto te permite poner negritas, links, etc.
    },
  ],
}