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
      name: 'fotoServicio',
      type: 'text',
      label: 'URL de la imagen (Link de PostImages)',
      required: false,
    },
    {
      name: 'resumen',
      type: 'text',
      label: 'Resumen corto (Aparece en la tarjeta)',
      required: false,
    },
    {
      name: 'detalles',
      type: 'richText',
      label: 'Información detallada (Aparece en el modal)',
      required: false,
    },
  ],
}